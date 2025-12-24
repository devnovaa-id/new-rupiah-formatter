import { RupiahFormatOptions } from '../utils/types';
import { DEFAULT_OPTIONS } from './constants';
import { toNumber } from '../utils/helpers';

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
    
    if (opts.minimumFractionDigits !== undefined && 
        (opts.minimumFractionDigits < 0 || opts.minimumFractionDigits > 20)) {
      throw new Error('Minimum fraction digits must be between 0 and 20');
    }
    
    if (opts.maximumFractionDigits !== undefined && 
        (opts.maximumFractionDigits < 0 || opts.maximumFractionDigits > 20)) {
      throw new Error('Maximum fraction digits must be between 0 and 20');
    }
    
    if (!['before', 'after'].includes(opts.symbolPosition || '')) {
      throw new Error('Symbol position must be "before" or "after"');
    }
    
    if (!['sign', 'parentheses', 'hidden'].includes(opts.negativeFormat || '')) {
      throw new Error('Negative format must be "sign", "parentheses", or "hidden"');
    }
    
    if (opts.formatStyle && !['standard', 'compact', 'accounting'].includes(opts.formatStyle)) {
      throw new Error('Format style must be "standard", "compact", or "accounting"');
    }
  }
  
  static sanitizeValue(value: unknown): number {
    try {
      return toNumber(value as any);
    } catch (error) {
      console.error('Error sanitizing value:', error, 'value:', value);
      return 0;
    }
  }
  
  static validateCurrencyCode(code: string): boolean {
    return /^[A-Z]{3}$/.test(code);
  }
  
  static validateInput(value: unknown): { isValid: boolean; error?: string; numericValue: number } {
    try {
      const numericValue = this.sanitizeValue(value);
      
      if (typeof value === 'string') {
        const cleaned = value.trim();
        if (cleaned === '') {
          return { isValid: true, numericValue: 0 };
        }
        
        // Common Rupiah patterns
        const rupiahPatterns = [
          /^(Rp\s*)?-?\s*\d{1,3}(\.\d{3})*(,\d{1,2})?$/,  // Rp 1.000,00
          /^(IDR\s*)?-?\s*\d{1,3}(,\d{3})*(\.\d{1,2})?$/, // IDR 1,000.00
          /^-?\d{1,3}(\.\d{3})*(,\d{1,2})?$/,             // 1.000,00
          /^-?\d{1,3}(,\d{3})*(\.\d{1,2})?$/,             // 1,000.00
          /^-?\d+(\.\d{1,2})?$/,                          // 1000.00
          /^-?\d+(,\d{1,2})?$/                            // 1000,00
        ];
        
        // Check if it's a valid number format
        let isValid = false;
        for (const pattern of rupiahPatterns) {
          if (pattern.test(cleaned)) {
            isValid = true;
            break;
          }
        }
        
        // Also accept plain numbers
        if (!isValid && /^-?\d+$/.test(cleaned.replace(/[^\d-]/g, ''))) {
          isValid = true;
        }
        
        return { 
          isValid, 
          error: isValid ? undefined : 'Invalid number format', 
          numericValue 
        };
      }
      
      return { isValid: true, numericValue };
    } catch (error) {
      return { 
        isValid: false, 
        error: error instanceof Error ? error.message : 'Unknown error', 
        numericValue: 0 
      };
    }
  }
}