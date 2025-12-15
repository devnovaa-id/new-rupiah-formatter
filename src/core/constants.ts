export const DEFAULT_OPTIONS = {
  symbol: 'Rp',
  decimalSeparator: ',',
  thousandSeparator: '.',
  precision: 0, // Changed from 2 to 0
  symbolPosition: 'before' as const,
  spaceBetween: true,
  stripTrailingZero: true, // Changed from false to true
  negativeFormat: 'sign' as const,
  fallback: 'Rp 0',
  locale: 'id-ID',
  currencyCode: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
} as const;

export const PRESETS = {
  compact: {
    stripTrailingZero: true,
    spaceBetween: false,
    precision: 0
  } as const,
  accounting: {
    negativeFormat: 'parentheses' as const,
    symbolPosition: 'before' as const,
    precision: 2
  } as const,
  international: {
    symbol: 'IDR',
    locale: 'en-US',
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 2
  } as const,
  noSymbol: {
    symbol: '',
    spaceBetween: false,
    precision: 0
  } as const,
  rounded: {
    precision: 0,
    stripTrailingZero: true
  } as const,
  standard: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 2,
    symbolPosition: 'before' as const,
    spaceBetween: true,
    stripTrailingZero: false
  } as const
} as const;