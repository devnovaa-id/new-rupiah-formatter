import { ParsedRupiah } from '../utils/types';
import { getLocaleConfig } from '../utils/locale';
import { toNumber } from '../utils/helpers';

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
    
    // For parsing, we just use the toNumber function which handles all formats
    const numeric = toNumber(cleaned);
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
    
    // Common Rupiah patterns - Diperbarui untuk menangani minus sebelum simbol
    const rupiahPatterns = [
      // Minus sebelum Rp dengan spasi
      /^-?\s*Rp\s*\d{1,3}(\.\d{3})*(,\d{1,2})?$/,
      // Minus sebelum IDR dengan spasi
      /^-?\s*IDR\s*\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
      // Rp tanpa spasi, dengan minus setelah Rp
      /^Rp-?\d{1,3}(\.\d{3})*(,\d{1,2})?$/,
      // IDR tanpa spasi, dengan minus setelah IDR
      /^IDR-?\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
      // Rp dengan spasi, minus optional setelah spasi (dan juga tanpa minus)
      /^(Rp\s*)?-?\s*\d{1,3}(\.\d{3})*(,\d{1,2})?$/,
      // IDR dengan spasi, minus optional setelah spasi (dan juga tanpa minus)
      /^(IDR\s*)?-?\s*\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
      // Format Indonesia tanpa simbol
      /^-?\d{1,3}(\.\d{3})*(,\d{1,2})?$/,
      // Format Internasional tanpa simbol
      /^-?\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
      // Format desimal dengan titik
      /^-?\d+(\.\d{1,2})?$/,
      // Format desimal dengan koma
      /^-?\d+(,\d{1,2})?$/
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