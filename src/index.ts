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
  generateAlias 
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
  InputValue
} from './utils/types';

// Convenience functions
export const formatRupiah = (
  value: InputValue,
  options?: Partial<RupiahFormatOptions>
): string => {
  return RupiahFormatter.format(value, options);
};

export const parseRupiah = (formattedString: string): number => {
  return RupiahParser.extractNumber(formattedString);
};

export const isValidRupiah = (formattedString: string): boolean => {
  return RupiahParser.isValidRupiah(formattedString);
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
  generateAlias
};

export type {
  RupiahFormatOptions,
  ParsedRupiah,
  CurrencyLocale,
  RupiahFormatterConfig,
  InputValue
};

// Default export for easy importing
const Rupiah = {
  format: formatRupiah,
  parse: parseRupiah,
  isValid: isValidRupiah,
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
    getLocaleConfig,
    detectLocale
  }
};

export default Rupiah;