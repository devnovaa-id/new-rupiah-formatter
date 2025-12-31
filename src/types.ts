// src/types.ts
export interface FormatOptions {
  symbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  symbolPosition?: 'before' | 'after';
  spaceBetween?: boolean;
  precision?: number;
  stripTrailingZero?: boolean;
  negativeFormat?: 'sign' | 'parentheses';
  fallback?: string;
}

export type InputValue = number | string;