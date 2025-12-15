import { ParsedRupiah } from '../utils/types';
import { getLocaleConfig } from '../utils/locale';

export class RupiahParser {
  static parse(formattedString: string, locale: string = 'id-ID'): ParsedRupiah {
    const localeConfig = getLocaleConfig(locale);
    
    // Clean the string
    let cleaned = formattedString.trim();
    
    // Remove currency symbol
    const symbolRegex = new RegExp(
      `\\s*${localeConfig.symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`,
      'gi'
    );
    cleaned = cleaned.replace(symbolRegex, '');
    
    // Remove thousand separators
    cleaned = cleaned.replace(
      new RegExp(`\\${localeConfig.thousandSeparator}`, 'g'),
      ''
    );
    
    // Replace decimal separator with dot
    cleaned = cleaned.replace(
      new RegExp(`\\${localeConfig.decimalSeparator}`, 'g'),
      '.'
    );
    
    // Remove any non-numeric characters except dot and minus
    cleaned = cleaned.replace(/[^\d.-]/g, '');
    
    // Check if cleaned is empty or invalid
    if (!cleaned || cleaned === '-' || cleaned === '.') {
      return {
        raw: formattedString,
        numeric: 0,
        isValid: false,
        currency: localeConfig.currency,
        locale: localeConfig.locale
      };
    }
    
    const numeric = parseFloat(cleaned);
    const isValid = !isNaN(numeric) && isFinite(numeric);
    
    return {
      raw: formattedString,
      numeric: isValid ? numeric : 0,
      isValid,
      currency: localeConfig.currency,
      locale: localeConfig.locale
    };
  }
  
  static extractNumber(formattedString: string): number {
    const parsed = this.parse(formattedString);
    return parsed.numeric;
  }
  
  static isValidRupiah(formattedString: string): boolean {
    // Strict validation for Rupiah format
    if (typeof formattedString !== 'string') return false;
    
    const trimmed = formattedString.trim();
    if (!trimmed) return false;
    
    // Check if it contains at least one digit
    if (!/\d/.test(trimmed)) return false;
    
    // Common Rupiah patterns
    const rupiahPatterns = [
      // Rp 1.000, Rp 1.000,00, Rp -1.000
      /^(Rp\s*)?-?\s*\d{1,3}(\.\d{3})*(,\d{1,2})?$/,
      // IDR 1,000.00
      /^(IDR\s*)?-?\s*\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
      // Rp1.000 (no space)
      /^Rp-?\d{1,3}(\.\d{3})*(,\d{1,2})?$/,
    ];
    
    // Check against patterns
    for (const pattern of rupiahPatterns) {
      if (pattern.test(trimmed)) {
        return true;
      }
    }
    
    return false;
  }
  
  static detectLocale(formattedString: string): string {
    const locales = ['id-ID', 'en-US', 'de-DE', 'fr-FR'];
    
    for (const locale of locales) {
      const localeConfig = getLocaleConfig(locale);
      if (formattedString.includes(localeConfig.symbol)) {
        return locale;
      }
    }
    
    return 'id-ID';
  }
}