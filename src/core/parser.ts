/**
 * Core Parser for Rupiah Formatter
 */

import { 
  InputValue, 
  FormatOptions
} from './types';
import { RupiahValidator } from './validator';

export class RupiahParser {
  static parse(
    input: string, 
    options: FormatOptions = {}
  ): number {
    try {
      // Validate input
      const formatValidation = RupiahValidator.validateFormatString(input, options);
      if (!formatValidation.isValid) {
        // Try to parse anyway with lenient mode
        return this.parseLenient(input);
      }
      
      const {
        symbol = 'Rp',
        decimalSeparator = ',',
        thousandSeparator = '.',
        symbolPosition = 'before',
        spaceBetween = false
      } = options;
      
      let cleaned = input.trim();
      
      // Remove symbol
      if (symbol) {
        const symbolPattern = symbolPosition === 'before' 
          ? `^${this.escapeRegex(symbol)}${spaceBetween ? '\\s*' : ''}`
          : `${spaceBetween ? '\\s*' : ''}${this.escapeRegex(symbol)}$`;
        
        cleaned = cleaned.replace(new RegExp(symbolPattern, 'g'), '');
      }
      
      // Handle parentheses for negative numbers (harus sebelum remove thousand separators)
      const isParenthesesNegative = cleaned.startsWith('(') && cleaned.endsWith(')');
      if (isParenthesesNegative) {
        cleaned = cleaned.slice(1, -1);
        cleaned = `-${cleaned}`;
      }
      
      // Handle braces for negative numbers
      const isBracesNegative = cleaned.startsWith('[') && cleaned.endsWith(']');
      if (isBracesNegative) {
        cleaned = cleaned.slice(1, -1);
        cleaned = `-${cleaned}`;
      }
      
      // Remove thousand separators
      if (thousandSeparator) {
        const escaped = this.escapeRegex(thousandSeparator);
        cleaned = cleaned.replace(new RegExp(escaped, 'g'), '');
      }
      
      // Convert decimal separator to dot
      if (decimalSeparator !== '.') {
        cleaned = cleaned.replace(decimalSeparator, '.');
      }
      
      // Parse as number
      const num = parseFloat(cleaned);
      
      if (isNaN(num)) {
        return 0;
      }
      
      return num;
      
    } catch (error) {
      console.warn('Parse error:', error);
      return this.parseLenient(input);
    }
  }
  
  static parseLenient(input: string | InputValue): number {
    try {
      if (typeof input !== 'string') {
        const validation = RupiahValidator.validateInput(input);
        return validation.isValid ? validation.value! : 0;
      }
      
      let cleaned = input.trim();
      
      // Remove currency symbols and letters
      cleaned = cleaned.replace(/[a-zA-Z]/g, '');
      
      // Handle parentheses for negative
      if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
        cleaned = `-${cleaned.slice(1, -1)}`;
      }
      
      // Handle braces for negative
      if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
        cleaned = `-${cleaned.slice(1, -1)}`;
      }
      
      // Keep only digits, dots, commas, and minus
      cleaned = cleaned.replace(/[^\d.,-]/g, '');
      
      // If there are no digits, return 0
      if (!/\d/.test(cleaned)) {
        return 0;
      }
      
      // Handle minus sign
      let isNegative = false;
      if (cleaned.startsWith('-')) {
        isNegative = true;
        cleaned = cleaned.substring(1);
      }
      
      // Determine decimal separator
      const lastComma = cleaned.lastIndexOf(',');
      const lastDot = cleaned.lastIndexOf('.');
      
      // No separators found
      if (lastComma === -1 && lastDot === -1) {
        const num = parseFloat(cleaned);
        return isNegative ? -num : num;
      }
      
      // Comma is last separator (likely decimal)
      if (lastComma > lastDot) {
        // Remove all dots (thousand separators)
        cleaned = cleaned.replace(/\./g, '');
        // Replace all commas with nothing, then add decimal point at last comma position
        const beforeComma = cleaned.substring(0, lastComma);
        const afterComma = cleaned.substring(lastComma + 1);
        cleaned = beforeComma + '.' + afterComma;
      } 
      // Dot is last separator
      else if (lastDot > lastComma) {
        // Check if dot is decimal or thousand separator
        const afterDot = cleaned.substring(lastDot + 1);
        
        // If after dot has 2 or 3 digits, assume it's decimal
        if (afterDot.length === 2 || afterDot.length === 3) {
          // Remove all commas (thousand separators)
          cleaned = cleaned.replace(/,/g, '');
        } else {
          // Assume dot is thousand separator
          cleaned = cleaned.replace(/\./g, '');
        }
      }
      
      // Remove any remaining commas (thousand separators)
      cleaned = cleaned.replace(/,/g, '');
      
      // Parse the number
      const num = parseFloat(cleaned);
      if (isNaN(num)) {
        return 0;
      }
      
      return isNegative ? -num : num;
      
    } catch (error) {
      console.warn('Lenient parse error:', error);
      return 0;
    }
  }
  
  static canParse(input: string, options: FormatOptions = {}): boolean {
    try {
      const validation = RupiahValidator.validateFormatString(input, options);
      if (validation.isValid) {
        return true;
      }
      
      // Try lenient parse
      const parsed = this.parseLenient(input);
      return parsed !== 0 || input.includes('0');
      
    } catch {
      return false;
    }
  }
  
  private static escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}