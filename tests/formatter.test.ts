import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { RupiahFormatter, formatRupiah, RupiahValidator } from '../src';

describe('RupiahFormatter', () => {
  let formatter: RupiahFormatter;
  let consoleSpy: any;

  beforeEach(() => {
    formatter = new RupiahFormatter();
    // Suppress warnings in tests
    formatter.suppressWarnings(true);
    
    // Mock console.error to suppress error logs in tests
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('formats basic numbers correctly', () => {
    expect(formatter.format(1000)).toBe('Rp 1.000');
    expect(formatter.format(1234567.89)).toBe('Rp 1.234.567,89');
  });
  
  test('handles negative numbers', () => {
    expect(formatter.format(-5000)).toBe('-Rp 5.000');
    expect(formatter.format(-1234.56)).toBe('-Rp 1.234,56');
  });
  
  test('handles zero values', () => {
    expect(formatter.format(0)).toBe('Rp 0');
    expect(formatter.format(0, { hideZero: true, fallback: 'Gratis' })).toBe('Gratis');
  });
  
  test('respects custom options', () => {
    const customFormatter = new RupiahFormatter({
      symbol: 'IDR',
      decimalSeparator: '.',
      thousandSeparator: ',',
      spaceBetween: false,
      precision: 2,
      stripTrailingZero: false
    });
    expect(customFormatter.format(1234567.89)).toBe('IDR1,234,567.89');
  });
  
  test('handles edge cases in input', () => {
    expect(formatter.format('')).toBe('Rp 0');
    expect(formatter.format(null as any)).toBe('Rp 0');
    expect(formatter.format(undefined as any)).toBe('Rp 0');
    expect(formatter.format('invalid')).toBe('Rp 0');
    expect(formatter.format('Rp 1.000')).toBe('Rp 1.000'); // Already formatted
  });
  
  test('alias support works', () => {
    formatter.createAlias('compact', { 
      stripTrailingZero: true, 
      spaceBetween: false 
    });
    expect(formatter.formatWithAlias(1000.00, 'compact')).toBe('Rp1.000');
    
    // Test alias not found
    expect(() => formatter.formatWithAlias(1000, 'nonexistent')).toThrow();
  });
  
  test('cache management works', () => {
    formatter.format(1000);
    formatter.format(2000);
    const stats = formatter.getCacheStats();
    expect(stats.size).toBeGreaterThan(0);
    
    formatter.clearCache();
    const newStats = formatter.getCacheStats();
    expect(newStats.size).toBe(0);
  });
  
  test('throws error for invalid options', () => {
    expect(() => new RupiahFormatter({ precision: -1 })).toThrow();
    expect(() => new RupiahFormatter({ 
      decimalSeparator: '.', 
      thousandSeparator: '.' 
    })).toThrow();
  });
});

describe('RupiahValidator', () => {
  test('validates input values correctly', () => {
    expect(RupiahValidator.sanitizeValue(1000)).toBe(1000);
    expect(RupiahValidator.sanitizeValue('1000')).toBe(1000);
    expect(RupiahValidator.sanitizeValue('Rp 1.000')).toBe(1000);
    expect(RupiahValidator.sanitizeValue('')).toBe(0);
    expect(RupiahValidator.sanitizeValue(null)).toBe(0);
    expect(RupiahValidator.sanitizeValue(undefined)).toBe(0);
    expect(RupiahValidator.sanitizeValue('invalid')).toBe(0);
    expect(RupiahValidator.sanitizeValue(true)).toBe(1);
    expect(RupiahValidator.sanitizeValue(false)).toBe(0);
  });
  
  test('validates options correctly', () => {
    expect(() => RupiahValidator.validateOptions({ precision: -1 })).toThrow();
    expect(() => RupiahValidator.validateOptions({ 
      decimalSeparator: '.', 
      thousandSeparator: '.' 
    })).toThrow();
  });
});

describe('formatRupiah convenience function', () => {
  let consoleWarnSpy: any;
  
  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  
  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });
  
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
  
  test('handles errors gracefully', () => {
    expect(formatRupiah('invalid' as any)).toBe('Rp 0');
    expect(formatRupiah(null as any)).toBe('Rp 0');
    expect(formatRupiah(undefined as any)).toBe('Rp 0');
  });
});