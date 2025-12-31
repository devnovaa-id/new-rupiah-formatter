// src/index.ts - SINGLE EXPORT
import { RupiahFormatter } from './formatter';
import { parseRupiah, isValidRupiah } from './parser';
import { BI_STANDARD, FORMAT_PRESETS } from './constants';
import type { FormatOptions, InputValue } from './types';

// Main function - DEAD SIMPLE
export function formatRupiah(
  value: InputValue,
  options?: FormatOptions
): string {
  return RupiahFormatter.format(value, options);
}

// Named exports for flexibility
export { 
  RupiahFormatter,
  parseRupiah,
  isValidRupiah,
  BI_STANDARD,
  FORMAT_PRESETS
};

export type { FormatOptions, InputValue };

// Default export (all-in-one object)
const Rupiah = {
  format: formatRupiah,
  parse: parseRupiah,
  isValid: isValidRupiah,
  Formatter: RupiahFormatter,
  STANDARD: BI_STANDARD,
  PRESETS: FORMAT_PRESETS
};

export default Rupiah;