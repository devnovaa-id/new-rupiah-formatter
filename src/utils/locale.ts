import { CurrencyLocale } from './types';

export const LOCALE_CONFIGS: Record<string, CurrencyLocale> = {
  'id-ID': {
    locale: 'id-ID',
    currency: 'IDR',
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.'
  },
  'en-US': {
    locale: 'en-US',
    currency: 'IDR',
    symbol: 'IDR',
    decimalSeparator: '.',
    thousandSeparator: ','
  },
  'en-GB': {
    locale: 'en-GB',
    currency: 'IDR',
    symbol: 'IDR',
    decimalSeparator: '.',
    thousandSeparator: ','
  },
  'de-DE': {
    locale: 'de-DE',
    currency: 'IDR',
    symbol: 'IDR',
    decimalSeparator: ',',
    thousandSeparator: '.'
  },
  'fr-FR': {
    locale: 'fr-FR',
    currency: 'IDR',
    symbol: 'IDR',
    decimalSeparator: ',',
    thousandSeparator: ' '
  }
};

export const getLocaleConfig = (locale: string = 'id-ID'): CurrencyLocale => {
  return LOCALE_CONFIGS[locale] || LOCALE_CONFIGS['id-ID'];
};

export const detectLocale = (): string => {
  if (typeof navigator !== 'undefined') {
    return navigator.language;
  }
  return 'id-ID';
};