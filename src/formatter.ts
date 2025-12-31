// src/formatter.ts - SANGAT SEDERHANA
import { BI_STANDARD } from './constants';
import type { FormatOptions, InputValue } from './types';

export class RupiahFormatter {
  private options: Required<FormatOptions>;

  constructor(options: FormatOptions = {}) {
    this.options = { ...BI_STANDARD, ...options };
    this.validateOptions();
  }

  private validateOptions(): void {
    if (this.options.decimalSeparator === this.options.thousandSeparator) {
      throw new Error('Decimal and thousand separators cannot be the same');
    }
    if (this.options.precision < 0 || this.options.precision > 20) {
      throw new Error('Precision must be between 0 and 20');
    }
  }

  private cleanNumber(num: number): number {
    if (!isFinite(num)) return 0;
    if (Math.abs(num) < Number.EPSILON) return 0;
    return num;
  }

  private formatNumber(num: number): string {
    const { decimalSeparator, thousandSeparator, precision } = this.options;
    const absNum = Math.abs(num);
    
    // Handle zero
    if (absNum === 0) {
      return precision > 0 ? `0${decimalSeparator}${'0'.repeat(precision)}` : '0';
    }

    // Format with fixed precision
    let [integer, decimal] = absNum.toFixed(precision).split('.');
    
    // Add thousand separators
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    
    if (precision === 0 || !decimal) {
      return integer;
    }
    
    return `${integer}${decimalSeparator}${decimal}`;
  }

  format(value: InputValue): string {
    try {
      // Convert input to number
      let num = typeof value === 'string' ? this.parse(value) : Number(value);
      num = this.cleanNumber(num);
      
      if (num === 0) return this.options.fallback;

      const { symbol, symbolPosition, spaceBetween, negativeFormat } = this.options;
      const isNegative = num < 0;
      const formattedNumber = this.formatNumber(num);
      
      // Build result based on options
      let result = formattedNumber;
      const space = spaceBetween ? ' ' : '';

      if (isNegative) {
        if (negativeFormat === 'parentheses') {
          result = symbolPosition === 'before'
            ? `${symbol}${space}(${formattedNumber})`
            : `(${formattedNumber})${space}${symbol}`;
        } else {
          const prefix = symbolPosition === 'before' ? `-${symbol}${space}` : '-';
          result = symbolPosition === 'before'
            ? `${prefix}${formattedNumber}`
            : `${prefix}${formattedNumber}${space}${symbol}`;
        }
      } else {
        result = symbolPosition === 'before'
          ? `${symbol}${space}${formattedNumber}`
          : `${formattedNumber}${space}${symbol}`;
      }

      return result;
    } catch (error) {
      console.warn('Format error:', error);
      return this.options.fallback;
    }
  }

  parse(formattedString: string): number {
    if (!formattedString || typeof formattedString !== 'string') return 0;
    
    const { thousandSeparator, decimalSeparator } = this.options;
    
    // Escape karakter khusus untuk regex
    const escapeRegExp = (string: string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    
    // Hapus simbol dan spasi
    let cleaned = formattedString
      .replace(/[^\d.,-]/g, '')
      .replace(new RegExp(escapeRegExp(thousandSeparator), 'g'), '') // Hapus thousand separator
      .replace(decimalSeparator, '.'); // Ganti decimal separator dengan titik
    
    // Handle angka negatif
    const isNegative = cleaned.startsWith('-');
    if (isNegative) cleaned = cleaned.substring(1);
    
    const num = parseFloat(cleaned) || 0;
    return isNegative ? -num : num;
  }

  // SIMPLE utility methods only
  formatRange(min: InputValue, max: InputValue, separator: string = ' - '): string {
    return `${this.format(min)}${separator}${this.format(max)}`;
  }

  static format(value: InputValue, options?: FormatOptions): string {
    return new RupiahFormatter(options).format(value);
  }

  static parse(formattedString: string): number {
    return new RupiahFormatter().parse(formattedString);
  }
}