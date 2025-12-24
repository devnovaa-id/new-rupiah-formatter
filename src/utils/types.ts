export type SymbolPosition = 'before' | 'after';
export type NegativeFormat = 'sign' | 'parentheses' | 'hidden';
export type FormatStyle = 'standard' | 'compact' | 'accounting';

export interface RupiahFormatOptions {
  symbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  precision?: number;
  symbolPosition?: SymbolPosition;
  spaceBetween?: boolean;
  stripTrailingZero?: boolean;
  negativeFormat?: NegativeFormat;
  fallback?: string;
  locale?: string;
  currencyCode?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  formatStyle?: FormatStyle;
  hideZero?: boolean;
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

export interface SeparatorPattern {
  thousand: string;
  decimal: string;
  symbol: string;
  space: boolean;
}

export type InputValue = number | string | bigint;