import { RupiahFormatOptions, InputValue } from '../utils/types';
import { DEFAULT_OPTIONS, PRESETS } from './constants';
import { 
  toNumber, 
  formatNumber, 
  roundToPrecision,
  abbreviateNumber,
  calculatePercentageDifference
} from '../utils/helpers';
import { getLocaleConfig } from '../utils/locale';
import { RupiahValidator } from './validator';

export class RupiahFormatter {
  private options: RupiahFormatOptions;
  private aliasMap: Map<string, RupiahFormatOptions> = new Map();
  private formatCache: Map<string, string> = new Map();
  private static instanceCache: WeakMap<object, RupiahFormatter> = new WeakMap();
  private cacheSizeLimit = 1000;
  private cacheHits = 0;
  private cacheMisses = 0;
  private shouldSuppressWarnings = false;
  
  constructor(options: Partial<RupiahFormatOptions> = {}) {
    try {
      this.options = { ...DEFAULT_OPTIONS, ...options };
      RupiahValidator.validateOptions(this.options);
    } catch (error) {
      console.error('Formatter initialization error:', error);
      this.options = { ...DEFAULT_OPTIONS };
      throw new Error(`Failed to initialize RupiahFormatter: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  private formatNumberWithFractions(
    num: number,
    decimalSeparator: string,
    thousandSeparator: string,
    precision: number,
    minimumFractionDigits: number
  ): string {
    try {
      if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
        return '0';
      }
      
      return formatNumber(
        Math.abs(num),
        decimalSeparator,
        thousandSeparator,
        precision,
        minimumFractionDigits
      );
    } catch (error) {
      console.error('Error in formatNumberWithFractions:', error, 'num:', num);
      return '0';
    }
  }
  
  format(value: InputValue, customOptions?: Partial<RupiahFormatOptions>): string {
    try {
      const validation = RupiahValidator.validateInput(value);
      if (!validation.isValid && !this.shouldSuppressWarnings) {
        console.warn('Invalid input value:', value, 'error:', validation.error);
      }
      
      const cacheKey = `${validation.numericValue}_${JSON.stringify(customOptions || this.options)}`;
      
      // Check cache
      if (this.formatCache.has(cacheKey)) {
        this.cacheHits++;
        return this.formatCache.get(cacheKey)!;
      }
      this.cacheMisses++;
      
      // Manage cache size
      if (this.formatCache.size >= this.cacheSizeLimit) {
        const firstKey = this.formatCache.keys().next().value;
        if (firstKey) {
          this.formatCache.delete(firstKey);
        }
      }
      
      const options = customOptions 
        ? { ...this.options, ...customOptions }
        : { ...this.options };
      
      const num = validation.numericValue;
      
      // Handle zero values
      if (num === 0 && options.hideZero && options.fallback) {
        this.formatCache.set(cacheKey, options.fallback);
        return options.fallback;
      }
      
      if (num === 0 && options.fallback) {
        this.formatCache.set(cacheKey, options.fallback);
        return options.fallback;
      }
      
      const localeConfig = getLocaleConfig(options.locale);
      const symbol = options.symbol || localeConfig.symbol;
      const decimalSeparator = options.decimalSeparator || localeConfig.decimalSeparator;
      const thousandSeparator = options.thousandSeparator || localeConfig.thousandSeparator;
      
      // Validate separators
      if (decimalSeparator === thousandSeparator) {
        throw new Error('Decimal and thousand separators cannot be the same');
      }
      
      let precision = options.precision ?? 2;
      
      if (options.minimumFractionDigits !== undefined) {
        precision = Math.max(precision, options.minimumFractionDigits);
      }
      if (options.maximumFractionDigits !== undefined) {
        precision = Math.min(precision, options.maximumFractionDigits);
      }
      
      const hasDecimal = num % 1 !== 0;
      let displayPrecision = precision;
      
      if (options.stripTrailingZero && !hasDecimal) {
        displayPrecision = 0;
      }
      
      const roundedNum = roundToPrecision(num, displayPrecision);
      const isNegative = roundedNum < 0;
      const absoluteNum = Math.abs(roundedNum);
      
      let formatted = this.formatNumberWithFractions(
        absoluteNum,
        decimalSeparator,
        thousandSeparator,
        displayPrecision,
        options.minimumFractionDigits || 0
      );
      
      // Clean up trailing zeros and decimal separator
      if (options.stripTrailingZero && decimalSeparator && formatted.includes(decimalSeparator)) {
        formatted = formatted.replace(new RegExp(`\\${decimalSeparator}?0+$`), '');
        if (formatted.endsWith(decimalSeparator)) {
          formatted = formatted.slice(0, -decimalSeparator.length);
        }
      }
      
      let result = formatted;
      
      // Handle symbol placement and negative formatting
      if (symbol && options.negativeFormat !== 'hidden') {
        const space = options.spaceBetween ? ' ' : '';
        
        if (isNegative && options.negativeFormat === 'parentheses') {
          result = options.symbolPosition === 'before'
            ? `${symbol}${space}(${formatted})`
            : `(${formatted})${space}${symbol}`;
        } else {
          const displaySymbol = isNegative && options.symbolPosition === 'before' 
            ? `-${symbol}` 
            : symbol;
          
          result = options.symbolPosition === 'before'
            ? `${displaySymbol}${space}${formatted}`
            : `${formatted}${space}${symbol}`;
          
          if (isNegative && options.symbolPosition === 'after') {
            result = `-${result}`;
          }
        }
      } else if (symbol && options.negativeFormat === 'hidden' && isNegative) {
        const space = options.spaceBetween ? ' ' : '';
        result = options.symbolPosition === 'before'
          ? `${symbol}${space}${formatted}`
          : `${formatted}${space}${symbol}`;
      } else {
        if (isNegative) {
          result = options.negativeFormat === 'parentheses' 
            ? `(${formatted})`
            : `-${formatted}`;
        }
      }
      
      this.formatCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error formatting value:', error, 'value:', value);
      return this.options.fallback || 'Rp 0';
    }
  }
  
  parse(formattedString: string): number {
    try {
      if (typeof formattedString !== 'string') {
        throw new Error('Input must be a string');
      }
      
      const parsed = toNumber(formattedString);
      if (isNaN(parsed)) {
        throw new Error('Failed to parse string to number');
      }
      return parsed;
    } catch (error) {
      console.error('Error parsing formatted string:', error, 'input:', formattedString);
      throw new Error(`Failed to parse Rupiah string: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  createAlias(name: string, options: Partial<RupiahFormatOptions>): void {
    try {
      if (!name || typeof name !== 'string') {
        throw new Error('Alias name must be a non-empty string');
      }
      
      if (this.aliasMap.has(name)) {
        throw new Error(`Alias "${name}" already exists`);
      }
      
      RupiahValidator.validateOptions(options);
      this.aliasMap.set(name, { ...this.options, ...options });
      this.clearCache();
    } catch (error) {
      console.error('Error creating alias:', error);
      throw new Error(`Failed to create alias: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  formatWithAlias(value: InputValue, alias: string): string {
    try {
      const aliasOptions = this.aliasMap.get(alias);
      if (!aliasOptions) {
        throw new Error(`Alias "${alias}" not found. Available aliases: ${Array.from(this.aliasMap.keys()).join(', ')}`);
      }
      return this.format(value, aliasOptions);
    } catch (error) {
      console.error('Error formatting with alias:', error);
      throw error;
    }
  }
  
  getAlias(name: string): RupiahFormatOptions | undefined {
    return this.aliasMap.get(name);
  }
  
  listAliases(): string[] {
    return Array.from(this.aliasMap.keys());
  }
  
  removeAlias(name: string): boolean {
    try {
      if (!this.aliasMap.has(name)) {
        return false;
      }
      
      const deleted = this.aliasMap.delete(name);
      if (deleted) {
        this.clearCache();
      }
      return deleted;
    } catch (error) {
      console.error('Error removing alias:', error);
      return false;
    }
  }
  
  usePreset(presetName: keyof typeof PRESETS): void {
    try {
      const preset = PRESETS[presetName];
      if (!preset) {
        throw new Error(`Preset "${presetName}" not found. Available presets: ${Object.keys(PRESETS).join(', ')}`);
      }
      this.options = { ...this.options, ...preset };
      RupiahValidator.validateOptions(this.options);
      this.clearCache();
    } catch (error) {
      console.error('Error using preset:', error);
      throw new Error(`Failed to use preset: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  updateOptions(newOptions: Partial<RupiahFormatOptions>): void {
    try {
      RupiahValidator.validateOptions(newOptions);
      this.options = { ...this.options, ...newOptions };
      this.clearCache();
    } catch (error) {
      console.error('Error updating options:', error);
      throw new Error(`Failed to update options: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  getOptions(): RupiahFormatOptions {
    return { ...this.options };
  }
  
  formatWithTemplate(value: InputValue, template: string): string {
    try {
      if (!template || typeof template !== 'string') {
        throw new Error('Template must be a non-empty string');
      }
      
      const formatted = this.format(value);
      return template.replace(/\{value\}/g, formatted);
    } catch (error) {
      console.error('Error formatting with template:', error);
      return this.options.fallback || 'Rp 0';
    }
  }
  
  formatRange(min: InputValue, max: InputValue, separator: string = ' - '): string {
    try {
      if (separator === undefined || separator === null) {
        separator = ' - ';
      }
      
      const minVal = RupiahValidator.sanitizeValue(min);
      const maxVal = RupiahValidator.sanitizeValue(max);
      
      if (minVal > maxVal) {
        console.warn('Minimum value is greater than maximum value in range formatting');
      }
      
      return `${this.format(min)}${separator}${this.format(max)}`;
    } catch (error) {
      console.error('Error formatting range:', error);
      return `${this.options.fallback}${separator}${this.options.fallback}`;
    }
  }
  
  formatWithAbbreviation(value: InputValue, customOptions?: Partial<RupiahFormatOptions>): string {
    try {
      const num = RupiahValidator.sanitizeValue(value);
      const formatted = this.format(value, customOptions);
      const abbreviated = abbreviateNumber(num);
      return `${formatted} (≈${abbreviated})`;
    } catch (error) {
      console.error('Error formatting with abbreviation:', error);
      return this.format(value, customOptions);
    }
  }
  
  calculatePercentage(value: InputValue, total: InputValue, customOptions?: Partial<RupiahFormatOptions>): string {
    try {
      const val = RupiahValidator.sanitizeValue(value);
      const tot = RupiahValidator.sanitizeValue(total);
      
      if (tot === 0) {
        return `${this.format(value, customOptions)} (0%)`;
      }
      
      const formattedValue = this.format(value, customOptions);
      const percentage = (val / tot) * 100;
      return `${formattedValue} (${percentage.toFixed(1)}%)`;
    } catch (error) {
      console.error('Error calculating percentage:', error);
      return this.format(value, customOptions);
    }
  }
  
  calculateGrowth(oldValue: InputValue, newValue: InputValue): string {
    try {
      const old = RupiahValidator.sanitizeValue(oldValue);
      const newVal = RupiahValidator.sanitizeValue(newValue);
      
      if (old === 0 && newVal === 0) {
        return `${this.format(old)} → ${this.format(newVal)} (0%)`;
      }
      
      const percentage = calculatePercentageDifference(old, newVal);
      const formattedOld = this.format(old);
      const formattedNew = this.format(newVal);
      
      const sign = percentage >= 0 ? '+' : '';
      return `${formattedOld} → ${formattedNew} (${sign}${percentage.toFixed(1)}%)`;
    } catch (error) {
      console.error('Error calculating growth:', error);
      return `${this.format(oldValue)} → ${this.format(newValue)}`;
    }
  }
  
  clearCache(): void {
    this.formatCache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }
  
  getCacheStats(): { hits: number; misses: number; size: number; hitRate: number } {
    const total = this.cacheHits + this.cacheMisses;
    const hitRate = total > 0 ? (this.cacheHits / total) * 100 : 0;
    
    return {
      hits: this.cacheHits,
      misses: this.cacheMisses,
      size: this.formatCache.size,
      hitRate: parseFloat(hitRate.toFixed(2))
    };
  }
  
  setCacheSizeLimit(limit: number): void {
    if (limit < 1) {
      throw new Error('Cache size limit must be at least 1');
    }
    this.cacheSizeLimit = limit;
    
    // Trim cache if it exceeds new limit
    while (this.formatCache.size > this.cacheSizeLimit) {
      const firstKey = this.formatCache.keys().next().value;
      if (firstKey) {
        this.formatCache.delete(firstKey);
      }
    }
  }
  
  suppressWarnings(suppress: boolean): void {
    this.shouldSuppressWarnings = suppress;
  }
  
  static format(value: InputValue, options?: Partial<RupiahFormatOptions>): string {
    try {
      const formatter = new RupiahFormatter(options);
      return formatter.format(value);
    } catch (error) {
      console.error('Error in static format:', error);
      return DEFAULT_OPTIONS.fallback;
    }
  }
  
  static parse(formattedString: string): number {
    try {
      return toNumber(formattedString);
    } catch (error) {
      console.error('Error in static parse:', error);
      return 0;
    }
  }
  
  static create(options?: Partial<RupiahFormatOptions>): RupiahFormatter {
    try {
      return new RupiahFormatter(options);
    } catch (error) {
      console.error('Error creating formatter:', error);
      return new RupiahFormatter();
    }
  }
  
  static getInstance(key: object, options?: Partial<RupiahFormatOptions>): RupiahFormatter {
    if (!key || typeof key !== 'object') {
      throw new Error('Key must be an object');
    }
    
    if (!RupiahFormatter.instanceCache.has(key)) {
      RupiahFormatter.instanceCache.set(key, new RupiahFormatter(options));
    }
    return RupiahFormatter.instanceCache.get(key)!;
  }
  
  static removeInstance(key: object): boolean {
    return RupiahFormatter.instanceCache.delete(key);
  }
}