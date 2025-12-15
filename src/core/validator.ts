import { RupiahFormatOptions } from '../utils/types';
import { DEFAULT_OPTIONS } from './constants';

export class RupiahValidator {
  static validateOptions(options: Partial<RupiahFormatOptions>): void {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    
    if (opts.precision < 0 || opts.precision > 20) {
      throw new Error('Precision must be between 0 and 20');
    }
    
    if (opts.decimalSeparator === opts.thousandSeparator) {
      throw new Error('Decimal and thousand separators must be different');
    }
    
    if (opts.minimumFractionDigits !== undefined && 
        opts.maximumFractionDigits !== undefined &&
        opts.minimumFractionDigits > opts.maximumFractionDigits) {
      throw new Error('Minimum fraction digits cannot be greater than maximum');
    }
  }
  
  static sanitizeValue(value: any): number {
    if (value == null || value === '') return 0;
    
    if (typeof value === 'number') {
      if (isNaN(value) || !isFinite(value)) return 0;
      return value;
    }
    
    if (typeof value === 'string') {
      const num = parseFloat(value.replace(/[^\d.,-]/g, ''));
      return isNaN(num) ? 0 : num;
    }
    
    if (typeof value === 'bigint') {
      return Number(value);
    }
    
    return 0;
  }
}