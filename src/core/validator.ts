/**
 * Core Validator for Rupiah Formatter
 */

import { 
  InputValue, 
  FormatOptions, 
  ValidationResult, 
  ERROR_CODES 
} from './types';

export class RupiahValidator {
  private static MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
  private static MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
  
  static validateInput(value: InputValue): ValidationResult {
    try {
      // Handle null/undefined
      if (value === null || value === undefined) {
        return {
          isValid: false,
          error: ERROR_CODES.INVALID_INPUT,
          message: 'Input cannot be null or undefined'
        };
      }
      
      // Convert to number
      let num: number;
      
      if (typeof value === 'number') {
        num = value;
      } else if (typeof value === 'string') {
        // Clean and parse string
        const cleaned = this.cleanString(value);
        num = parseFloat(cleaned);
      } else if (typeof value === 'bigint') {
        num = Number(value);
      } else {
        return {
          isValid: false,
          error: ERROR_CODES.INVALID_INPUT,
          message: `Unsupported input type: ${typeof value}`
        };
      }
      
      // Check for NaN
      if (isNaN(num)) {
        return {
          isValid: false,
          error: ERROR_CODES.INVALID_INPUT,
          message: 'Input is not a valid number'
        };
      }
      
      // Check for Infinity
      if (!isFinite(num)) {
        return {
          isValid: false,
          error: ERROR_CODES.OVERFLOW,
          message: 'Number is infinite'
        };
      }
      
      // Check safe integer range
      if (num > this.MAX_SAFE_INTEGER || num < this.MIN_SAFE_INTEGER) {
        return {
          isValid: false,
          error: ERROR_CODES.OVERFLOW,
          message: 'Number exceeds safe integer range',
          value: num
        };
      }
      
      // Handle negative zero
      if (Object.is(num, -0)) {
        num = 0;
      }
      
      return {
        isValid: true,
        value: num,
        message: 'Valid input'
      };
      
    } catch (error) {
      return {
        isValid: false,
        error: ERROR_CODES.INVALID_INPUT,
        message: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  static validateOptions(options: FormatOptions): ValidationResult {
    try {
      // Check separator conflict
      if (options.decimalSeparator && options.thousandSeparator) {
        if (options.decimalSeparator === options.thousandSeparator) {
          return {
            isValid: false,
            error: ERROR_CODES.OPTIONS_ERROR,
            message: 'Decimal and thousand separators cannot be the same'
          };
        }
      }
      
      // Check precision range
      if (options.precision !== undefined) {
        if (options.precision < 0 || options.precision > 20) {
          return {
            isValid: false,
            error: ERROR_CODES.OPTIONS_ERROR,
            message: 'Precision must be between 0 and 20'
          };
        }
      }
      
      // Check fraction digits consistency
      if (options.minimumFractionDigits !== undefined && 
          options.maximumFractionDigits !== undefined) {
        if (options.minimumFractionDigits > options.maximumFractionDigits) {
          return {
            isValid: false,
            error: ERROR_CODES.OPTIONS_ERROR,
            message: 'Minimum fraction digits cannot be greater than maximum'
          };
        }
      }
      
      // Validate symbol position
      if (options.symbolPosition && 
          !['before', 'after'].includes(options.symbolPosition)) {
        return {
          isValid: false,
          error: ERROR_CODES.OPTIONS_ERROR,
          message: 'Symbol position must be either "before" or "after"'
        };
      }
      
      // Validate negative format
      if (options.negativeFormat && 
          !['sign', 'parentheses', 'braces', 'none'].includes(options.negativeFormat)) {
        return {
          isValid: false,
          error: ERROR_CODES.OPTIONS_ERROR,
          message: 'Invalid negative format'
        };
      }
      
      return {
        isValid: true,
        message: 'Valid options'
      };
      
    } catch (error) {
      return {
        isValid: false,
        error: ERROR_CODES.OPTIONS_ERROR,
        message: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  static validateFormatString(
    input: string, 
    options: FormatOptions = {}
  ): ValidationResult {
    if (!input || typeof input !== 'string') {
      return {
        isValid: false,
        error: ERROR_CODES.INVALID_FORMAT,
        message: 'Input must be a non-empty string'
      };
    }
    
    try {
      // Basic pattern validation
      const {
        symbol = 'Rp',
        decimalSeparator = ',',
        thousandSeparator = '.',
        symbolPosition = 'before',
        spaceBetween = false
      } = options;
      
      // Escape regex special characters
      const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Build dynamic regex
      const symbolPart = escapeRegex(symbol);
      const spacePart = spaceBetween ? '\\s*' : '';
      
      let pattern: string;
      
      if (symbolPosition === 'before') {
        pattern = `^${symbolPart}${spacePart}`;
      } else {
        pattern = `^`;
      }
      
      // Number part with thousand separators
      const thousandPart = escapeRegex(thousandSeparator);
      pattern += `[\\d${thousandPart}]+`;
      
      // Decimal part
      const decimalPart = escapeRegex(decimalSeparator);
      pattern += `(?:${decimalPart}\\d+)?`;
      
      if (symbolPosition === 'after') {
        pattern += `${spacePart}${symbolPart}`;
      }
      
      pattern += '$';
      
      const regex = new RegExp(pattern);
      const isValid = regex.test(input.trim());
      
      if (!isValid) {
        return {
          isValid: false,
          error: ERROR_CODES.INVALID_FORMAT,
          message: 'String does not match expected format'
        };
      }
      
      return {
        isValid: true,
        message: 'Valid format string'
      };
      
    } catch (error) {
      return {
        isValid: false,
        error: ERROR_CODES.INVALID_FORMAT,
        message: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  private static cleanString(str: string): string {
    let cleaned = str.trim();
    
    // Remove currency symbols and non-numeric characters (keep digits, dots, commas, minus)
    cleaned = cleaned.replace(/[^\d.,-]/g, '');
    
    // Handle negative signs in parentheses or brackets
    if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
      cleaned = `-${cleaned.slice(1, -1)}`;
    }
    if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
      cleaned = `-${cleaned.slice(1, -1)}`;
    }
    
    // Remove any remaining non-numeric except digits, dot, comma, minus
    cleaned = cleaned.replace(/[^\d.,-]/g, '');
    
    // Handle multiple minus signs
    const hasMinus = cleaned.includes('-');
    cleaned = cleaned.replace(/-/g, '');
    
    // Determine the decimal separator
    const lastDot = cleaned.lastIndexOf('.');
    const lastComma = cleaned.lastIndexOf(',');
    
    let result = cleaned;
    
    // If both separators exist, determine which is decimal
    if (lastDot !== -1 && lastComma !== -1) {
      if (lastDot > lastComma) {
        // Dot is decimal, comma is thousand
        result = cleaned.replace(/,/g, '');
      } else {
        // Comma is decimal, dot is thousand
        result = cleaned.replace(/\./g, '').replace(',', '.');
      }
    } else if (lastDot !== -1) {
      // Only dot exists - check if it's likely decimal or thousand
      const parts = cleaned.split('.');
      if (parts.length > 1) {
        const lastPart = parts[parts.length - 1];
        // If last part has <= 2 digits, likely decimal
        if (lastPart.length <= 2) {
          // Dot is decimal, remove other dots (thousand separators)
          result = cleaned.replace(/\.(?=\d{3})/g, '').replace('.', ',');
        } else {
          // Dot is thousand separator
          result = cleaned.replace(/\./g, '');
        }
      }
    } else if (lastComma !== -1) {
      // Only comma exists - check if it's likely decimal or thousand
      const parts = cleaned.split(',');
      if (parts.length > 1) {
        const lastPart = parts[parts.length - 1];
        // If last part has <= 2 digits, likely decimal
        if (lastPart.length <= 2) {
          // Comma is decimal, convert to dot
          result = cleaned.replace(/,/g, '.');
        } else {
          // Comma is thousand separator
          result = cleaned.replace(/,/g, '');
        }
      }
    }
    
    // Add minus sign back if needed
    if (hasMinus) {
      result = `-${result}`;
    }
    
    return result;
  }
}