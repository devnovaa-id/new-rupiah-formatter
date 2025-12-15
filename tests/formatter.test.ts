import { describe, test, expect } from '@jest/globals';
import { RupiahFormatter, formatRupiah } from '../src';

describe('RupiahFormatter', () => {
  test('formats basic numbers correctly', () => {
    const formatter = new RupiahFormatter();
    expect(formatter.format(1000)).toBe('Rp 1.000');
    expect(formatter.format(1234567.89)).toBe('Rp 1.234.567,89');
  });
  
  test('handles negative numbers', () => {
    const formatter = new RupiahFormatter();
    expect(formatter.format(-5000)).toBe('-Rp 5.000');
  });
  
  test('respects custom options', () => {
    const formatter = new RupiahFormatter({
      symbol: 'IDR',
      decimalSeparator: '.',
      thousandSeparator: ',',
      spaceBetween: false,
      precision: 2,
      stripTrailingZero: false // Explicitly set for decimal numbers
    });
    expect(formatter.format(1234567.89)).toBe('IDR1,234,567.89');
  });
  
  test('alias support works', () => {
    const formatter = new RupiahFormatter();
    formatter.createAlias('compact', { 
      stripTrailingZero: true, 
      spaceBetween: false 
    });
    expect(formatter.formatWithAlias(1000.00, 'compact')).toBe('Rp1.000');
  });
});

describe('formatRupiah convenience function', () => {
  test('formats without creating instance', () => {
    expect(formatRupiah(1000)).toBe('Rp 1.000');
  });
  
  test('formats with custom options', () => {
    expect(formatRupiah(1234567.89, {
      symbol: 'IDR',
      decimalSeparator: '.',
      thousandSeparator: ',',
      stripTrailingZero: false
    })).toBe('IDR 1,234,567.89');
  });
});