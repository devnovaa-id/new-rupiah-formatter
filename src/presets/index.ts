/**
 * Presets for Rupiah Formatter
 * Pre-configured options for different use cases
 */

import { FormatOptions } from '../core/types';

export const PRESETS = {
  // Bank Indonesia Standard (Official)
  BI_STANDARD: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    symbolPosition: 'before' as const,
    spaceBetween: false,
    precision: 2,
    stripTrailingZero: false,
    negativeFormat: 'sign' as const,
    fallback: 'Rp0',
    useGrouping: true,
    roundingMode: 'half-up' as const,
    allowNegativeZero: false,
    compact: false,
    compactThreshold: 1000,
    compactPrecision: 1,
    locale: 'id-ID',
    currencyDisplay: 'symbol' as const
  },
  
  // E-commerce (Simple, no decimals) - TIDAK PAKAI COMPACT
  ECOMMERCE: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    symbolPosition: 'before' as const,
    spaceBetween: false,
    precision: 0,
    stripTrailingZero: true,
    negativeFormat: 'sign' as const,
    fallback: 'Gratis',
    useGrouping: true,
    roundingMode: 'half-up' as const,
    allowNegativeZero: false,
    compact: false, // DIUBAH DARI true KE false
    compactThreshold: 10000,
    compactPrecision: 1,
    locale: 'id-ID',
    currencyDisplay: 'symbol' as const
  },
  
  // Accounting (Parentheses for negatives)
  ACCOUNTING: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    symbolPosition: 'before' as const,
    spaceBetween: false,
    precision: 2,
    stripTrailingZero: false,
    negativeFormat: 'parentheses' as const,
    fallback: 'Rp0',
    useGrouping: true,
    roundingMode: 'half-up' as const,
    allowNegativeZero: false,
    compact: false,
    compactThreshold: 1000000,
    compactPrecision: 1,
    locale: 'id-ID',
    currencyDisplay: 'symbol' as const
  },
  
  // Financial (International format)
  FINANCIAL: {
    symbol: 'IDR',
    decimalSeparator: '.',
    thousandSeparator: ',',
    symbolPosition: 'before' as const,
    spaceBetween: true,
    precision: 2,
    stripTrailingZero: false,
    negativeFormat: 'sign' as const,
    fallback: 'IDR 0',
    useGrouping: true,
    roundingMode: 'half-up' as const,
    allowNegativeZero: false,
    compact: false,
    compactThreshold: 1000000,
    compactPrecision: 1,
    locale: 'en-US',
    currencyDisplay: 'code' as const
  },
  
  // Mobile (Compact display)
  MOBILE: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    symbolPosition: 'before' as const,
    spaceBetween: false,
    precision: 0,
    stripTrailingZero: true,
    negativeFormat: 'sign' as const,
    fallback: 'Rp0',
    useGrouping: true,
    roundingMode: 'half-up' as const,
    allowNegativeZero: false,
    compact: true,
    compactThreshold: 1000,
    compactPrecision: 1,
    locale: 'id-ID',
    currencyDisplay: 'symbol' as const
  },
  
  // Crypto (High precision)
  CRYPTO: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    symbolPosition: 'before' as const,
    spaceBetween: false,
    precision: 8,
    stripTrailingZero: true,
    negativeFormat: 'sign' as const,
    fallback: 'Rp0',
    useGrouping: true,
    roundingMode: 'trunc' as const,
    allowNegativeZero: false,
    compact: false,
    compactThreshold: 1000000000,
    compactPrecision: 2,
    locale: 'id-ID',
    currencyDisplay: 'symbol' as const
  },
  
  // Simple (Like v2.0.0)
  SIMPLE: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    symbolPosition: 'before' as const,
    spaceBetween: false,
    precision: 2,
    stripTrailingZero: false,
    negativeFormat: 'sign' as const,
    fallback: 'Rp0',
    useGrouping: true,
    roundingMode: 'half-up' as const,
    allowNegativeZero: false,
    compact: false,
    compactThreshold: 1000,
    compactPrecision: 1,
    locale: 'id-ID',
    currencyDisplay: 'symbol' as const
  }
} as const;

export type PresetName = keyof typeof PRESETS;

/**
 * Get a preset by name
 */
export function getPreset(name: PresetName): FormatOptions {
  return { ...PRESETS[name] };
}

/**
 * Create a custom preset by merging with a base preset
 */
export function createPreset(
  base: PresetName | FormatOptions,
  overrides: Partial<FormatOptions>
): FormatOptions {
  const baseOptions = typeof base === 'string' 
    ? getPreset(base)
    : base;
    
  return { ...baseOptions, ...overrides };
}

/**
 * Validate if options match a preset
 */
export function matchesPreset(
  options: FormatOptions,
  presetName: PresetName
): boolean {
  const preset = PRESETS[presetName];
  
  for (const [key, value] of Object.entries(preset)) {
    if (options[key as keyof FormatOptions] !== value) {
      return false;
    }
  }
  
  return true;
}

/**
 * Find the best matching preset for given options
 */
export function findMatchingPreset(options: FormatOptions): PresetName | null {
  for (const [name, preset] of Object.entries(PRESETS)) {
    if (matchesPreset(options, name as PresetName)) {
      return name as PresetName;
    }
  }
  
  return null;
}

export default PRESETS;