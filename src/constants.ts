// src/constants.ts
export const BI_STANDARD = {
  symbol: 'Rp',
  decimalSeparator: ',',
  thousandSeparator: '.',
  symbolPosition: 'before' as const,
  spaceBetween: false,
  precision: 2,
  stripTrailingZero: false,
  negativeFormat: 'sign' as const,
  fallback: 'Rp0'
} as const;

export const FORMAT_PRESETS = {
  STANDARD: BI_STANDARD,
  NO_DECIMAL: { ...BI_STANDARD, precision: 0, stripTrailingZero: true },
  COMPACT: { ...BI_STANDARD, precision: 0, stripTrailingZero: true },
  ACCOUNTING: { ...BI_STANDARD, negativeFormat: 'parentheses' as const }
} as const;