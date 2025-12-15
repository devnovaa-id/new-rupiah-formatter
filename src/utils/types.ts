export interface RupiahFormatOptions {
  symbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  precision?: number;
  symbolPosition?: 'before' | 'after';
  spaceBetween?: boolean;
  stripTrailingZero?: boolean;
  negativeFormat?: 'sign' | 'parentheses';
  fallback?: string;
  locale?: string;
  currencyCode?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface ParsedRupiah {
  raw: string;
  numeric: number;
  isValid: boolean;
  currency: string;
  locale: string;
}

export interface CurrencyLocale {
  locale: string;
  currency: string;
  symbol: string;
  decimalSeparator: string;
  thousandSeparator: string;
}

export interface RupiahFormatterConfig extends RupiahFormatOptions {
  alias?: string;
  presets?: Record<string, Partial<RupiahFormatOptions>>;
}

export type InputValue = number | string | bigint;