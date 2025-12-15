import { describe, test, expect } from '@jest/globals';
import { RupiahParser, parseRupiah, isValidRupiah } from '../src';

describe('RupiahParser', () => {
  test('parses formatted string correctly', () => {
    const parsed = RupiahParser.parse('Rp 1.234.567,89');
    expect(parsed.numeric).toBe(1234567.89);
    expect(parsed.isValid).toBe(true);
    expect(parsed.currency).toBe('IDR');
  });
  
  test('extracts number from formatted string', () => {
    expect(RupiahParser.extractNumber('Rp 5.000')).toBe(5000);
  });
  
  test('validates rupiah string', () => {
    expect(RupiahParser.isValidRupiah('Rp 1.000')).toBe(true);
    expect(RupiahParser.isValidRupiah('IDR 1,000.00')).toBe(true);
    expect(RupiahParser.isValidRupiah('Rp1.000')).toBe(true);
    expect(RupiahParser.isValidRupiah('invalid')).toBe(false);
    expect(RupiahParser.isValidRupiah('not money')).toBe(false);
    expect(RupiahParser.isValidRupiah('123abc')).toBe(false);
  });
});

describe('parseRupiah convenience function', () => {
  test('parses formatted string', () => {
    expect(parseRupiah('Rp 1.234.567,89')).toBe(1234567.89);
  });
});

describe('isValidRupiah function', () => {
  test('validates rupiah strings', () => {
    expect(isValidRupiah('Rp 1.000')).toBe(true);
    expect(isValidRupiah('IDR 1,000.00')).toBe(true);
    expect(isValidRupiah('not money')).toBe(false);
  });
});