// Core exports
import { RupiahFormatter } from './core/formatter';
import { RupiahValidator } from './core/validator';
import { DEFAULT_OPTIONS, PRESETS } from './core/constants';

// Parser exports
import { RupiahParser } from './parse/parser';
import { RupiahSanitizer } from './parse/sanitizer';

// Utils exports
import { 
  isNumeric, 
  toNumber, 
  formatNumber, 
  roundToPrecision,
  generateAlias,
  abbreviateNumber,
  calculatePercentageDifference
} from './utils/helpers';

import { 
  LOCALE_CONFIGS, 
  getLocaleConfig, 
  detectLocale 
} from './utils/locale';

// Types
import type {
  RupiahFormatOptions,
  ParsedRupiah,
  CurrencyLocale,
  RupiahFormatterConfig,
  InputValue,
  SeparatorPattern,
  SymbolPosition,
  NegativeFormat,
  FormatStyle
} from './utils/types';

// Convenience functions with enhanced error handling
export const formatRupiah = (
  value: InputValue,
  options?: Partial<RupiahFormatOptions>
): string => {
  try {
    if (value === undefined || value === null) {
      return options?.fallback || DEFAULT_OPTIONS.fallback;
    }
    
    const validation = RupiahValidator.validateInput(value);
    if (!validation.isValid) {
      // Suppress warning for common cases
      if (typeof value === 'string' && value.trim() !== '') {
        console.warn('Invalid value passed to formatRupiah:', value);
      }
    }
    
    // Use instance method instead of static method
    const formatter = new RupiahFormatter(options);
    return formatter.format(validation.numericValue);
  } catch (error) {
    console.error('Error in formatRupiah:', error, 'value:', value);
    return options?.fallback || DEFAULT_OPTIONS.fallback;
  }
};

export const parseRupiah = (formattedString: string): number => {
  try {
    if (typeof formattedString !== 'string') {
      throw new Error('Input must be a string');
    }
    
    const trimmed = formattedString.trim();
    if (!trimmed) {
      return 0;
    }
    
    return RupiahParser.extractNumber(trimmed);
  } catch (error) {
    console.error('Error in parseRupiah:', error, 'input:', formattedString);
    return 0;
  }
};

export const isValidRupiah = (formattedString: string): boolean => {
  try {
    if (typeof formattedString !== 'string') {
      return false;
    }
    
    const trimmed = formattedString.trim();
    if (!trimmed) {
      return false;
    }
    
    return RupiahParser.isValidRupiah(trimmed);
  } catch (error) {
    console.error('Error in isValidRupiah:', error);
    return false;
  }
};

export const formatRupiahWithAbbreviation = (
  value: InputValue,
  options?: Partial<RupiahFormatOptions>
): string => {
  try {
    const validation = RupiahValidator.validateInput(value);
    if (!validation.isValid) {
      console.warn('Invalid value passed to formatRupiahWithAbbreviation:', value);
    }
    
    const formatter = new RupiahFormatter(options);
    return formatter.formatWithAbbreviation(validation.numericValue);
  } catch (error) {
    console.error('Error in formatRupiahWithAbbreviation:', error);
    return formatRupiah(value, options);
  }
};

export const formatRupiahRange = (
  min: InputValue,
  max: InputValue,
  options?: Partial<RupiahFormatOptions>,
  separator: string = ' - '
): string => {
  try {
    const formatter = new RupiahFormatter(options);
    return formatter.formatRange(min, max, separator);
  } catch (error) {
    console.error('Error in formatRupiahRange:', error);
    const fallback = options?.fallback || DEFAULT_OPTIONS.fallback;
    return `${fallback}${separator}${fallback}`;
  }
};

export const formatRupiahWithTemplate = (
  value: InputValue,
  template: string,
  options?: Partial<RupiahFormatOptions>
): string => {
  try {
    const formatter = new RupiahFormatter(options);
    return formatter.formatWithTemplate(value, template);
  } catch (error) {
    console.error('Error in formatRupiahWithTemplate:', error);
    return options?.fallback || DEFAULT_OPTIONS.fallback;
  }
};

// Named exports
export { 
  RupiahFormatter,
  RupiahValidator,
  RupiahParser,
  RupiahSanitizer
};

export { 
  DEFAULT_OPTIONS,
  PRESETS,
  LOCALE_CONFIGS,
  getLocaleConfig,
  detectLocale,
  isNumeric,
  toNumber,
  formatNumber,
  roundToPrecision,
  generateAlias,
  abbreviateNumber,
  calculatePercentageDifference
};

export type {
  RupiahFormatOptions,
  ParsedRupiah,
  CurrencyLocale,
  RupiahFormatterConfig,
  InputValue,
  SeparatorPattern,
  SymbolPosition,
  NegativeFormat,
  FormatStyle
};

// Default export for easy importing
const Rupiah = {
  format: formatRupiah,
  parse: parseRupiah,
  isValid: isValidRupiah,
  formatWithAbbreviation: formatRupiahWithAbbreviation,
  formatRange: formatRupiahRange,
  formatWithTemplate: formatRupiahWithTemplate,
  Formatter: RupiahFormatter,
  Parser: RupiahParser,
  Validator: RupiahValidator,
  Sanitizer: RupiahSanitizer,
  presets: PRESETS,
  constants: DEFAULT_OPTIONS,
  locales: LOCALE_CONFIGS,
  helpers: {
    isNumeric,
    toNumber,
    formatNumber,
    roundToPrecision,
    generateAlias,
    abbreviateNumber,
    calculatePercentageDifference,
    getLocaleConfig,
    detectLocale
  }
};

export default Rupiah;