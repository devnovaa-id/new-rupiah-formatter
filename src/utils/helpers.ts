import { InputValue } from './types';

export const isNumeric = (value: any): boolean => {
  if (typeof value === 'number' || typeof value === 'bigint') return true;
  if (typeof value !== 'string') return false;
  
  // Remove currency symbols, spaces, and commas
  const cleaned = value
    .replace(/[^\d.,-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  return !isNaN(parseFloat(cleaned)) && isFinite(parseFloat(cleaned));
};

export const toNumber = (value: InputValue): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'bigint') return Number(value);
  
  // Clean string and convert
  const cleaned = value
    .replace(/[^\d.,-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

export const roundToPrecision = (num: number, precision: number): number => {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
};

export const formatNumber = (
  num: number,
  decimalSeparator: string = ',',
  thousandSeparator: string = '.',
  precision: number = 2
): string => {
  const fixedNum = Math.abs(num).toFixed(precision);
  const [integer, decimal] = fixedNum.split('.');
  
  const formattedInteger = integer.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator
  );
  
  return decimal ? `${formattedInteger}${decimalSeparator}${decimal}` : formattedInteger;
};

export const generateAlias = (options: any): string => {
  return `rp_${Object.values(options).join('_')}`.replace(/[^a-zA-Z0-9_]/g, '');
};