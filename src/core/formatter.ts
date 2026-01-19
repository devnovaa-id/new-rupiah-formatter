/**
 * Core Formatter for Rupiah Formatter
 */

import { 
  InputValue, 
  FormatOptions, 
  FormatResult, 
  ValidationResult,
  Plugin 
} from './types';
import { RupiahValidator } from './validator';
import { RupiahParser } from './parser';

export interface CoreFormatterOptions extends FormatOptions {
  plugins?: Plugin[];
}

export class CoreFormatter {
  private options: Required<Omit<FormatOptions, 'minimumFractionDigits' | 'maximumFractionDigits'>> & {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
  private plugins: Map<string, Plugin> = new Map();
  
  private static DEFAULT_OPTIONS = {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    symbolPosition: 'before' as const,
    spaceBetween: false,
    precision: 2,
    stripTrailingZero: false,
    negativeFormat: 'sign' as const,
    fallback: 'Rp0',
    useGrouping: true,
    roundingMode: 'half-up' as const,
    allowNegativeZero: false,
    compact: false,
    compactThreshold: 1000,
    compactPrecision: 1,
    locale: 'id-ID',
    currencyDisplay: 'symbol' as const
  };
  
  constructor(options: FormatOptions = {}) {
    this.options = { ...CoreFormatter.DEFAULT_OPTIONS, ...options };
    this.validateOptions();
  }
  
  private validateOptions(): void {
    const validation = RupiahValidator.validateOptions(this.options);
    if (!validation.isValid) {
      throw new Error(validation.message || 'Invalid options');
    }
  }
  
  format(value: InputValue): string {
    try {
      // Run beforeFormat hooks
      let processedValue = value;
      for (const plugin of this.plugins.values()) {
        if (plugin.beforeFormat) {
          const result = plugin.beforeFormat(processedValue, this.options);
          if (result !== undefined) {
            processedValue = result;
          }
        }
      }
      
      // Validate and convert input
      const validation = RupiahValidator.validateInput(processedValue);
      if (!validation.isValid) {
        return this.options.fallback || 'Rp0';
      }
      
      let num = validation.value!;
      
      // Handle zero - PERBAIKAN DI SINI
      if (num === 0 && !this.options.allowNegativeZero) {
        // Gunakan fallback khusus untuk angka 0 jika tersedia
        if (this.options.fallback && this.options.fallback !== 'Rp0') {
          return this.runAfterFormatHooks({
            formatted: this.options.fallback,
            value: 0,
            options: this.options,
            metadata: {
              isNegative: false,
              isZero: true,
              isInteger: true,
              decimalCount: 0
            }
          }).formatted;
        }
        const result = this.formatZero();
        return this.runAfterFormatHooks(result).formatted;
      }
      
      // Apply compact formatting if enabled
      if (this.options.compact && Math.abs(num) >= this.options.compactThreshold) {
        const compactResult = this.formatCompact(num);
        return this.runAfterFormatHooks(compactResult).formatted;
      }
      
      // Apply rounding
      num = this.roundNumber(num);
      
      // Format the number
      const isNegative = num < 0;
      const absNum = Math.abs(num);
      
      // Split integer and decimal parts
      const [integerPart, decimalPart] = this.splitNumber(absNum);
      
      // Format integer part with grouping
      const formattedInteger = this.formatInteger(integerPart);
      
      // Format decimal part
      const formattedDecimal = this.formatDecimal(decimalPart);
      
      // Combine parts
      let numberString = formattedInteger;
      if (formattedDecimal) {
        numberString += this.options.decimalSeparator + formattedDecimal;
      }
      
      // Add symbol and handle negative
      const formatted = this.addSymbolAndSign(numberString, isNegative);
      
      const result: FormatResult = {
        formatted,
        value: num,
        options: this.options,
        metadata: {
          isNegative,
          isZero: num === 0,
          isInteger: Number.isInteger(num),
          decimalCount: decimalPart ? decimalPart.length : 0
        }
      };
      
      // Run afterFormat hooks
      const finalResult = this.runAfterFormatHooks(result);
      
      return finalResult.formatted;
      
    } catch (error) {
      console.warn('Format error:', error);
      return this.options.fallback || 'Rp0';
    }
  }
  
  parse(formattedString: string): number {
    return RupiahParser.parse(formattedString, this.options);
  }
  
  validate(value: InputValue): ValidationResult {
    return RupiahValidator.validateInput(value);
  }
  
  getOptions(): FormatOptions {
    return { ...this.options };
  }
  
  setOptions(newOptions: Partial<FormatOptions>): void {
    const mergedOptions = { ...this.options, ...newOptions };
    const validation = RupiahValidator.validateOptions(mergedOptions);
    
    if (!validation.isValid) {
      throw new Error(validation.message || 'Invalid options');
    }
    
    this.options = mergedOptions;
  }
  
  use(plugin: Plugin, pluginOptions?: any): this {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" is already installed`);
      return this;
    }
    
    try {
      plugin.install(this, pluginOptions);
      this.plugins.set(plugin.name, plugin);
    } catch (error) {
      console.error(`Failed to install plugin "${plugin.name}":`, error);
    }
    
    return this;
  }
  
  unuse(pluginName: string): boolean {
    const plugin = this.plugins.get(pluginName);
    
    if (plugin) {
      if (plugin.uninstall) {
        plugin.uninstall();
      }
      return this.plugins.delete(pluginName);
    }
    
    return false;
  }
  
  destroy(): void {
    // Uninstall all plugins
    for (const plugin of this.plugins.values()) {
      if (plugin.uninstall) {
        plugin.uninstall();
      }
    }
    
    this.plugins.clear();
  }
  
  private formatZero(): FormatResult {
    const numberString = this.options.precision > 0
      ? `0${this.options.decimalSeparator}${'0'.repeat(this.options.precision)}`
      : '0';
    
    const formatted = this.addSymbolAndSign(numberString, false);
    
    return {
      formatted,
      value: 0,
      options: this.options,
      metadata: {
        isNegative: false,
        isZero: true,
        isInteger: true,
        decimalCount: this.options.precision
      }
    };
  }
  
  private formatCompact(num: number): FormatResult {
    const absNum = Math.abs(num);
    const isNegative = num < 0;
    
    const units = ['', 'RB', 'JT', 'M', 'T'];
    const unitIndex = Math.min(
      Math.floor(Math.log10(absNum) / 3),
      units.length - 1
    );
    
    const divisor = Math.pow(1000, unitIndex);
    let compactValue = absNum / divisor;
    
    // Round to specified precision
    compactValue = this.roundNumber(compactValue, this.options.compactPrecision);
    
    // Format with fixed precision
    const fixed = compactValue.toFixed(this.options.compactPrecision);
    const [integerPart, decimalPart] = fixed.split('.');
    
    let numberString = this.formatInteger(integerPart);
    
    // Add decimal part if needed
    if (this.options.compactPrecision > 0) {
      let decimalToShow = decimalPart || '';
      // Remove trailing zeros if enabled
      if (this.options.stripTrailingZero) {
        decimalToShow = decimalToShow.replace(/0+$/, '');
      }
      if (decimalToShow.length > 0) {
        numberString += this.options.decimalSeparator + decimalToShow;
      }
    }
    
    numberString += units[unitIndex];
    
    const formatted = this.addSymbolAndSign(numberString, isNegative);
    
    return {
      formatted,
      value: num,
      options: this.options,
      metadata: {
        isNegative,
        isZero: false,
        isInteger: Number.isInteger(num),
        decimalCount: this.options.compactPrecision,
        isCompact: true,
        compactUnit: units[unitIndex],
        originalValue: num
      }
    };
  }
  
  private roundNumber(num: number, customPrecision?: number): number {
    const precision = customPrecision ?? this.options.precision;
    
    if (precision < 0 || precision > 20) {
      throw new Error(`Precision ${precision} is out of range (0-20)`);
    }
    
    if (num === 0) return 0;
    
    const factor = Math.pow(10, precision);
    
    // More robust rounding with error handling
    try {
      // Handle very large numbers
      if (Math.abs(num) > Number.MAX_SAFE_INTEGER / factor) {
        // Use string manipulation for very large numbers
        const str = num.toFixed(precision);
        return parseFloat(str);
      }
      
      const scaled = num * factor;
      
      switch (this.options.roundingMode) {
        case 'half-up':
          return Math.round(scaled) / factor;
        case 'half-down':
          const rounded = Math.round(scaled);
          return (Math.abs(scaled % 1) === 0.5 && rounded > scaled)
            ? (rounded - 1) / factor
            : rounded / factor;
        case 'floor':
          return Math.floor(scaled) / factor;
        case 'ceil':
          return Math.ceil(scaled) / factor;
        case 'trunc':
          return Math.trunc(scaled) / factor;
        default:
          return Math.round(scaled) / factor;
      }
    } catch (error) {
      console.error('Rounding error:', error);
      // Fallback to basic rounding
      return parseFloat(num.toFixed(precision));
    }
  }
  
  private splitNumber(num: number, customPrecision?: number): [string, string | null] {
    const precision = customPrecision ?? this.options.precision;
    
    if (precision === 0) {
      return [Math.round(num).toString(), null];
    }
    
    const fixed = num.toFixed(precision);
    const [integer, decimal] = fixed.split('.');
    
    return [integer, decimal || null];
  }
  
  private formatInteger(integer: string): string {
    if (!this.options.useGrouping || integer.length <= 3) {
      return integer;
    }
    
    const { thousandSeparator } = this.options;
    return integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  }
  
  private formatDecimal(decimal: string | null): string {
    if (!decimal) {
      return '';
    }
    
    let formatted = decimal;
    
    // Strip trailing zeros if enabled
    if (this.options.stripTrailingZero) {
      formatted = formatted.replace(/0+$/, '');
    }
    
    // Ensure minimum fraction digits
    if (this.options.minimumFractionDigits !== undefined) {
      const minLength = this.options.minimumFractionDigits;
      if (formatted.length < minLength) {
        formatted = formatted.padEnd(minLength, '0');
      }
    }
    
    // Ensure maximum fraction digits
    if (this.options.maximumFractionDigits !== undefined) {
      const maxLength = this.options.maximumFractionDigits;
      if (formatted.length > maxLength) {
        formatted = formatted.slice(0, maxLength);
      }
    }
    
    return formatted;
  }
  
  private addSymbolAndSign(numberString: string, isNegative: boolean): string {
    const { symbol, symbolPosition, spaceBetween, negativeFormat } = this.options;
    const space = spaceBetween ? ' ' : '';
    
    // Format angka dengan simbol terlebih dahulu
    let formattedWithSymbol = numberString;
    if (symbol) {
      if (symbolPosition === 'before') {
        formattedWithSymbol = symbol + space + numberString;
      } else {
        formattedWithSymbol = numberString + space + symbol;
      }
    }
    
    // Terapkan format negatif pada string yang sudah ada simbolnya
    if (isNegative) {
      switch (negativeFormat) {
        case 'parentheses':
          return `(${formattedWithSymbol})`;
        case 'braces':
          return `[${formattedWithSymbol}]`;
        case 'sign':
          // Tanda minus harus di depan simbol
          return `-${formattedWithSymbol}`;
        case 'none':
          return formattedWithSymbol;
      }
    }
    
    return formattedWithSymbol;
  }
  
  private runAfterFormatHooks(result: FormatResult): FormatResult {
    let processedResult = result;
    
    for (const plugin of this.plugins.values()) {
      if (plugin.afterFormat) {
        try {
          const pluginResult = plugin.afterFormat(processedResult);
          if (pluginResult) {
            // Ensure the plugin returns a valid FormatResult
            if (typeof pluginResult === 'object' && 'formatted' in pluginResult) {
              processedResult = pluginResult;
            } else {
              console.warn(`Plugin "${plugin.name}" returned invalid result from afterFormat hook`);
            }
          }
        } catch (error) {
          console.error(`Plugin "${plugin.name}" error in afterFormat hook:`, error);
        }
      }
    }
    
    return processedResult;
  }
}