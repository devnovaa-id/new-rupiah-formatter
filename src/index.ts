/**
 * Main entry point for Rupiah Formatter v3.0.0
 * Simple API for most common use cases
 */

import { AdvancedRupiahFormatter } from './advanced';
import { PRESETS } from './presets';
import { 
  InputValue, 
  FormatOptions, 
  ValidationResult,
  Plugin 
} from './core/types';

// Import plugins untuk digunakan di default export
import { CachePlugin, CompactPlugin, WordsPlugin, ReactPlugin } from './plugins';
import { 
  Performance, 
  Memory, 
  ErrorHandler,
  toNumber,
  roundNumber,
  formatWithSeparators 
} from './utils';

// Create default formatter instance TANPA plugin
const defaultFormatter = new AdvancedRupiahFormatter(PRESETS.BI_STANDARD, []);

// Simple formatting function (90% of use cases)
export function formatRupiah(
  value: InputValue,
  options?: FormatOptions | keyof typeof PRESETS
): string {
  let formatter: AdvancedRupiahFormatter;
  
  if (typeof options === 'string' && PRESETS[options]) {
    formatter = new AdvancedRupiahFormatter(PRESETS[options], []);
  } else if (options && typeof options === 'object') {
    formatter = new AdvancedRupiahFormatter(options, []);
  } else {
    formatter = defaultFormatter;
  }
  
  const result = formatter.format(value);
  return result || 'Rp0';
}

// Simple parsing function
export function parseRupiah(
  formattedString: string,
  options?: FormatOptions
): number {
  const formatter = new AdvancedRupiahFormatter(options, []);
  return formatter.parse(formattedString);
}

// Simple validation function
export function validateRupiah(
  value: InputValue
): ValidationResult {
  return defaultFormatter.validate(value);
}

// Check if string is valid Rupiah format
export function isValidRupiah(
  formattedString: string,
  options?: FormatOptions
): boolean {
  try {
    const formatter = new AdvancedRupiahFormatter(options, []);
    const parsed = formatter.parse(formattedString);
    const formatted = formatter.format(parsed);
    
    // Normalize for comparison
    const normalize = (str: string) => 
      str.replace(/\s/g, '').toUpperCase();
    
    return normalize(formatted) === normalize(formattedString);
  } catch {
    return false;
  }
}

// Create formatter with plugins
export function createFormatter(
  options?: FormatOptions | keyof typeof PRESETS,
  plugins?: Array<string | Plugin>
): AdvancedRupiahFormatter {
  const resolvedOptions = typeof options === 'string' 
    ? PRESETS[options]
    : options;
    
  return new AdvancedRupiahFormatter(resolvedOptions, plugins);
}

// Quick formatting with preset
export function rupiah(
  value: InputValue,
  preset?: keyof typeof PRESETS
): string {
  const options = preset ? PRESETS[preset] : PRESETS.BI_STANDARD;
  const formatter = new AdvancedRupiahFormatter(options, []);
  return formatter.format(value) || 'Rp0';
}

// Attach preset names to rupiah function
rupiah.BI_STANDARD = 'BI_STANDARD';
rupiah.ECOMMERCE = 'ECOMMERCE';
rupiah.ACCOUNTING = 'ACCOUNTING';
rupiah.FINANCIAL = 'FINANCIAL';
rupiah.MOBILE = 'MOBILE';
rupiah.CRYPTO = 'CRYPTO';
rupiah.SIMPLE = 'SIMPLE';

// Export everything
export {
  AdvancedRupiahFormatter as RupiahFormatter,
  PRESETS
};
export type { Plugin };

// Export plugins
export { CachePlugin, CompactPlugin, WordsPlugin, ReactPlugin } from './plugins';

// Export utilities
export { 
  Performance, 
  Memory, 
  ErrorHandler,
  toNumber,
  roundNumber,
  formatWithSeparators
} from './utils';

// Default export
const Rupiah = {
  format: formatRupiah,
  parse: parseRupiah,
  validate: validateRupiah,
  isValid: isValidRupiah,
  createFormatter,
  rupiah,
  Formatter: AdvancedRupiahFormatter,
  PRESETS,
  plugins: {
    CachePlugin,
    CompactPlugin,
    WordsPlugin,
    ReactPlugin
  },
  utils: {
    Performance,
    Memory,
    ErrorHandler,
    toNumber,
    roundNumber,
    formatWithSeparators
  }
};

export default Rupiah;