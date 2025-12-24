export const DEFAULT_OPTIONS = {
  symbol: 'Rp',
  decimalSeparator: ',',
  thousandSeparator: '.',
  precision: 2,
  symbolPosition: 'before' as const,
  spaceBetween: true,
  stripTrailingZero: true,
  negativeFormat: 'sign' as const,
  fallback: 'Rp 0',
  locale: 'id-ID',
  currencyCode: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  hideZero: false,
  formatStyle: 'standard' as const
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
    precision: 2,
    stripTrailingZero: false
  } as const,
  international: {
    symbol: 'IDR',
    locale: 'en-US',
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 2,
    stripTrailingZero: false
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
  } as const,
  ecommerce: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 0,
    stripTrailingZero: true,
    spaceBetween: false,
    fallback: 'Gratis'
  } as const,
  financial: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 2,
    stripTrailingZero: false,
    spaceBetween: true,
    negativeFormat: 'parentheses'
  } as const,
  mobile: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 0,
    stripTrailingZero: true,
    spaceBetween: false,
    symbolPosition: 'before' as const
  } as const,
  crypto: {
    symbol: '',
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 8,
    stripTrailingZero: false,
    spaceBetween: false,
    symbolPosition: 'after' as const
  } as const
} as const;