import { RupiahFormatOptions, InputValue } from '../utils/types';
import { DEFAULT_OPTIONS, PRESETS } from './constants';
import { 
  toNumber, 
  formatNumber, 
  roundToPrecision,
  generateAlias 
} from '../utils/helpers';
import { getLocaleConfig } from '../utils/locale';
import { RupiahValidator } from './validator';

export class RupiahFormatter {
  private options: RupiahFormatOptions;
  private aliasMap: Map<string, RupiahFormatOptions> = new Map();
  
  constructor(options: Partial<RupiahFormatOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    RupiahValidator.validateOptions(this.options);
  }
  
  format(value: InputValue, customOptions?: Partial<RupiahFormatOptions>): string {
    const options = customOptions 
      ? { ...this.options, ...customOptions }
      : { ...this.options };
    
    const num = RupiahValidator.sanitizeValue(value);
    if (num === 0 && options.fallback) {
      return options.fallback;
    }
    
    const localeConfig = getLocaleConfig(options.locale);
    const symbol = options.symbol || localeConfig.symbol;
    const decimalSeparator = options.decimalSeparator || localeConfig.decimalSeparator;
    const thousandSeparator = options.thousandSeparator || localeConfig.thousandSeparator;
    
    // Determine appropriate precision
    const hasDecimal = num % 1 !== 0;
    let precision = options.precision ?? 2;
    
    // Adjust precision based on stripTrailingZero and whether number has decimals
    if (options.stripTrailingZero && !hasDecimal) {
      precision = 0;
    } else if (hasDecimal) {
      // For numbers with decimals, use max between options.precision and 2
      precision = Math.max(options.precision ?? 2, 2);
    }
    
    const roundedNum = roundToPrecision(num, precision);
    const isNegative = roundedNum < 0;
    const absoluteNum = Math.abs(roundedNum);
    
    let formatted = formatNumber(
      absoluteNum,
      decimalSeparator,
      thousandSeparator,
      precision
    );
    
    // Strip trailing zeros if enabled
    if (options.stripTrailingZero && decimalSeparator && formatted.includes(decimalSeparator)) {
      formatted = formatted.replace(new RegExp(`\\${decimalSeparator}?0+$`), '');
      // Remove decimal separator if nothing after it
      if (formatted.endsWith(decimalSeparator)) {
        formatted = formatted.slice(0, -decimalSeparator.length);
      }
    }
    
    // Add currency symbol
    let result = formatted;
    if (symbol) {
      const space = options.spaceBetween ? ' ' : '';
      result = options.symbolPosition === 'before'
        ? `${symbol}${space}${formatted}`
        : `${formatted}${space}${symbol}`;
    }
    
    // Apply negative format (sign before the entire formatted string)
    if (isNegative) {
      result = options.negativeFormat === 'parentheses' 
        ? `(${result})`
        : `-${result}`;
    }
    
    return result;
  }
  
  parse(formattedString: string): number {
    return toNumber(formattedString);
  }
  
  // Alias support
  createAlias(name: string, options: Partial<RupiahFormatOptions>): void {
    this.aliasMap.set(name, options);
  }
  
  formatWithAlias(value: InputValue, alias: string): string {
    const aliasOptions = this.aliasMap.get(alias);
    if (!aliasOptions) {
      throw new Error(`Alias "${alias}" not found`);
    }
    return this.format(value, aliasOptions);
  }
  
  getAlias(name: string): RupiahFormatOptions | undefined {
    return this.aliasMap.get(name);
  }
  
  listAliases(): string[] {
    return Array.from(this.aliasMap.keys());
  }
  
  removeAlias(name: string): boolean {
    return this.aliasMap.delete(name);
  }
  
  // Preset support
  usePreset(presetName: keyof typeof PRESETS): void {
    const preset = PRESETS[presetName];
    if (!preset) {
      throw new Error(`Preset "${presetName}" not found`);
    }
    this.options = { ...this.options, ...preset };
  }
  
  // Configuration management
  updateOptions(newOptions: Partial<RupiahFormatOptions>): void {
    this.options = { ...this.options, ...newOptions };
    RupiahValidator.validateOptions(this.options);
  }
  
  getOptions(): RupiahFormatOptions {
    return { ...this.options };
  }
  
  // Static convenience methods
  static format(value: InputValue, options?: Partial<RupiahFormatOptions>): string {
    const formatter = new RupiahFormatter(options);
    return formatter.format(value);
  }
  
  static parse(formattedString: string): number {
    return toNumber(formattedString);
  }
  
  static create(options?: Partial<RupiahFormatOptions>): RupiahFormatter {
    return new RupiahFormatter(options);
  }
}