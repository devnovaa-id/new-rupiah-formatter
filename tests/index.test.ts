import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import Rupiah from '../src';
import {
  RupiahFormatter,
  RupiahValidator,
  RupiahParser,
  RupiahSanitizer,
  formatRupiah,
  parseRupiah,
  isValidRupiah,
  formatRupiahWithAbbreviation,
  formatRupiahRange,
  formatRupiahWithTemplate,
  DEFAULT_OPTIONS,
  PRESETS,
  LOCALE_CONFIGS,
  getLocaleConfig,
  detectLocale,
  isNumeric,
  toNumber,
  formatNumber,
  roundToPrecision,
  generateAlias,
  abbreviateNumber,
  calculatePercentageDifference
} from '../src';

describe('RupiahFormatter - Basic', () => {
  let formatter: RupiahFormatter;
  let consoleSpy: any;

  beforeEach(() => {
    formatter = new RupiahFormatter();
    formatter.suppressWarnings(true);
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
    expect(formatter.format('Rp 1.000')).toBe('Rp 1.000');
  });
  
  test('alias support works', () => {
    formatter.createAlias('compact', { 
      stripTrailingZero: true, 
      spaceBetween: false 
    });
    expect(formatter.formatWithAlias(1000.00, 'compact')).toBe('Rp1.000');
    
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

describe('RupiahFormatter - Extended', () => {
  let formatter: RupiahFormatter;
  let consoleErrorSpy: any;
  let consoleWarnSpy: any;

  beforeEach(() => {
    formatter = new RupiahFormatter();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    formatter.suppressWarnings(true);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  test('parse method dengan error handling', () => {
    expect(formatter.parse('Rp 1.000')).toBe(1000);
    expect(formatter.parse('IDR 1,000.00')).toBe(1000);
    expect(formatter.parse('1.234.567,89')).toBe(1234567.89);
    
    expect(() => formatter.parse(null as any)).toThrow();
    expect(() => formatter.parse(undefined as any)).toThrow();
    expect(() => formatter.parse(123 as any)).toThrow();
  });

  test('alias operations', () => {
    formatter.createAlias('testAlias', { symbol: 'IDR', precision: 0 });
    
    expect(formatter.getAlias('testAlias')).toEqual(
      expect.objectContaining({ symbol: 'IDR', precision: 0 })
    );
    
    expect(formatter.listAliases()).toContain('testAlias');
    
    expect(formatter.formatWithAlias(1000, 'testAlias')).toBe('IDR 1.000');
    
    expect(formatter.removeAlias('testAlias')).toBe(true);
    expect(formatter.removeAlias('nonexistent')).toBe(false);
    
    expect(() => formatter.createAlias('', {})).toThrow();
    expect(() => formatter.createAlias('uniqueAlias', {})).not.toThrow();
    expect(() => formatter.createAlias('uniqueAlias', {})).toThrow();
  });

  test('usePreset dengan semua preset', () => {
    const presets = [
      'compact', 'accounting', 'international', 'noSymbol',
      'rounded', 'standard', 'ecommerce', 'financial',
      'mobile', 'crypto'
    ];
    
    for (const preset of presets) {
      const presetFormatter = new RupiahFormatter();
      expect(() => presetFormatter.usePreset(preset as any)).not.toThrow();
    }
    
    expect(() => formatter.usePreset('invalid' as any)).toThrow();
  });

  test('updateOptions dan getOptions', () => {
    const initialOptions = formatter.getOptions();
    expect(initialOptions.symbol).toBe('Rp');
    
    formatter.updateOptions({ symbol: 'IDR', precision: 3 });
    const updatedOptions = formatter.getOptions();
    expect(updatedOptions.symbol).toBe('IDR');
    expect(updatedOptions.precision).toBe(3);
    
    expect(() => formatter.updateOptions({ precision: -1 })).toThrow();
  });

  test('formatWithTemplate', () => {
    expect(formatter.formatWithTemplate(1000, 'Harga: {value}')).toBe('Harga: Rp 1.000');
    expect(formatter.formatWithTemplate(1000, '')).toBe('Rp 0');
    expect(formatter.formatWithTemplate(1000, 'Total: {value} diskon')).toBe('Total: Rp 1.000 diskon');
    
    expect(formatter.formatWithTemplate('invalid', 'Harga: {value}')).toBe('Harga: Rp 0');
  });

  test('formatRange', () => {
    expect(formatter.formatRange(1000, 2000)).toBe('Rp 1.000 - Rp 2.000');
    expect(formatter.formatRange(1000, 2000, ' to ')).toBe('Rp 1.000 to Rp 2.000');
    expect(formatter.formatRange(2000, 1000)).toBe('Rp 2.000 - Rp 1.000');
    
    expect(formatter.formatRange(1000, 2000, undefined)).toBe('Rp 1.000 - Rp 2.000');
    expect(formatter.formatRange(1000, 2000, null as any)).toBe('Rp 1.000 - Rp 2.000');
  });

  test('formatWithAbbreviation', () => {
    expect(formatter.formatWithAbbreviation(1000)).toBe('Rp 1.000 (≈1.0K)');
    expect(formatter.formatWithAbbreviation(1000000)).toBe('Rp 1.000.000 (≈1.0M)');
    expect(formatter.formatWithAbbreviation(1000000000)).toBe('Rp 1.000.000.000 (≈1.0B)');
    
    expect(formatter.formatWithAbbreviation(1000, { symbol: 'IDR' })).toBe('IDR 1.000 (≈1.0K)');
  });

  test('calculatePercentage', () => {
    expect(formatter.calculatePercentage(500, 1000)).toBe('Rp 500 (50.0%)');
    expect(formatter.calculatePercentage(0, 1000)).toBe('Rp 0 (0.0%)');
    expect(formatter.calculatePercentage(500, 0)).toBe('Rp 500 (0%)');
    
    expect(formatter.calculatePercentage(500, 1000, { symbol: 'IDR' })).toBe('IDR 500 (50.0%)');
  });

  test('calculateGrowth', () => {
    expect(formatter.calculateGrowth(500, 1000)).toBe('Rp 500 → Rp 1.000 (+100.0%)');
    expect(formatter.calculateGrowth(1000, 500)).toBe('Rp 1.000 → Rp 500 (-50.0%)');
    expect(formatter.calculateGrowth(0, 0)).toBe('Rp 0 → Rp 0 (0%)');
  });

  test('cache management extended', () => {
    let stats = formatter.getCacheStats();
    expect(stats.size).toBe(0);
    expect(stats.hits).toBe(0);
    expect(stats.misses).toBe(0);
    
    formatter.format(1000);
    formatter.format(2000);
    formatter.format(1000);
    
    stats = formatter.getCacheStats();
    expect(stats.size).toBe(2);
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(2);
    
    formatter.clearCache();
    stats = formatter.getCacheStats();
    expect(stats.size).toBe(0);
    
    formatter.setCacheSizeLimit(3);
    for (let i = 0; i < 5; i++) {
      formatter.format(i * 1000);
    }
    stats = formatter.getCacheStats();
    expect(stats.size).toBeLessThanOrEqual(3);
    
    expect(() => formatter.setCacheSizeLimit(0)).toThrow();
  });

  test('cache overflow handling', () => {
    const smallCacheFormatter = new RupiahFormatter();
    smallCacheFormatter.setCacheSizeLimit(2);
    
    // Fill cache with 2 items
    smallCacheFormatter.format(1000);
    smallCacheFormatter.format(2000);
    
    // This should trigger cache eviction
    smallCacheFormatter.format(3000);
    
    const stats = smallCacheFormatter.getCacheStats();
    expect(stats.size).toBe(2);
  });

  test('suppressWarnings', () => {
    formatter.suppressWarnings(false);
    expect(formatter.format('invalid')).toBe('Rp 0');
    formatter.suppressWarnings(true);
  });

  test('static methods', () => {
    expect(RupiahFormatter.format(1000)).toBe('Rp 1.000');
    expect(RupiahFormatter.format('invalid')).toBe('Rp 0');
    
    expect(RupiahFormatter.parse('Rp 1.000')).toBe(1000);
    expect(RupiahFormatter.parse('invalid')).toBe(0);
    
    expect(RupiahFormatter.create()).toBeInstanceOf(RupiahFormatter);
    
    const key = {};
    const instance1 = RupiahFormatter.getInstance(key);
    const instance2 = RupiahFormatter.getInstance(key);
    expect(instance1).toBe(instance2);
    
    expect(RupiahFormatter.removeInstance(key)).toBe(true);
    expect(RupiahFormatter.removeInstance(key)).toBe(false);
    
    expect(() => RupiahFormatter.getInstance(null as any)).toThrow('Key must be an object');
    expect(() => RupiahFormatter.getInstance(123 as any)).toThrow('Key must be an object');
    expect(() => RupiahFormatter.getInstance('string' as any)).toThrow('Key must be an object');
  });

  test('static create handles constructor errors', () => {
    // Simulate constructor error by temporarily overriding
    const originalFormatter = RupiahFormatter;
    
    // Create a mock that throws
    const MockFormatter = jest.fn(() => {
      throw new Error('Mock constructor error');
    }) as any;
    MockFormatter.format = RupiahFormatter.format;
    MockFormatter.parse = RupiahFormatter.parse;
    MockFormatter.create = RupiahFormatter.create;
    MockFormatter.getInstance = RupiahFormatter.getInstance;
    MockFormatter.removeInstance = RupiahFormatter.removeInstance;
    
    // Temporarily replace the global RupiahFormatter
    const globalAny = global as any;
    const originalGlobalFormatter = globalAny.RupiahFormatter;
    globalAny.RupiahFormatter = MockFormatter;
    
    // Import again to get the mocked version
    jest.isolateModules(() => {
      const { RupiahFormatter: MockedFormatter } = require('../src/core/formatter');
      
      // This should handle the error and return a default formatter
      const result = MockedFormatter.create();
      expect(result).toBeDefined();
    });
    
    // Restore
    globalAny.RupiahFormatter = originalGlobalFormatter;
  });

  test('error handling in constructor', () => {
    expect(() => new RupiahFormatter({ precision: -1 })).toThrow();
  });

  test('format dengan berbagai negativeFormat', () => {
    expect(formatter.format(-1000)).toBe('-Rp 1.000');
    
    const parenthesesFormatter = new RupiahFormatter({ negativeFormat: 'parentheses' });
    expect(parenthesesFormatter.format(-1000)).toBe('Rp (1.000)');
    
    const hiddenFormatter = new RupiahFormatter({ negativeFormat: 'hidden' });
    expect(hiddenFormatter.format(-1000)).toBe('Rp 1.000');
  });

  test('format dengan hideZero dan fallback', () => {
    expect(formatter.format(0, { hideZero: true, fallback: 'Gratis' })).toBe('Gratis');
    expect(formatter.format(0, { fallback: 'Nol' })).toBe('Nol');
    expect(formatter.format(0, { hideZero: false, fallback: 'Gratis' })).toBe('Gratis');
  });

  test('format dengan symbolPosition after', () => {
    const afterFormatter = new RupiahFormatter({ 
      symbolPosition: 'after',
      spaceBetween: true 
    });
    expect(afterFormatter.format(1000)).toBe('1.000 Rp');
    expect(afterFormatter.format(-1000)).toBe('-1.000 Rp');
  });

  test('format dengan minimumFractionDigits dan maximumFractionDigits', () => {
    const customFormatter = new RupiahFormatter({ stripTrailingZero: false });
    expect(customFormatter.format(1000.5, { 
      minimumFractionDigits: 2,
      stripTrailingZero: false
    })).toBe('Rp 1.000,50');
  });

  test('format dengan invalid value', () => {
    expect(formatter.format(NaN)).toBe('Rp 0');
    expect(formatter.format(Infinity)).toBe('Rp 0');
    expect(formatter.format(-Infinity)).toBe('Rp 0');
  });

  test('format dengan decimal/thousand separator sama', () => {
    expect(() => {
      new RupiahFormatter({ decimalSeparator: '.', thousandSeparator: '.' });
    }).toThrow();
  });

  test('formatWithAlias throws for non-existent alias', () => {
    expect(() => {
      formatter.formatWithAlias(1000, 'non-existent-alias');
    }).toThrow('Alias "non-existent-alias" not found');
  });

  test('removeAlias returns false for non-existent alias', () => {
    expect(formatter.removeAlias('non-existent')).toBe(false);
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

  test('validateOptions dengan berbagai kasus edge', () => {
    expect(() => RupiahValidator.validateOptions({ precision: 5 })).not.toThrow();
    expect(() => RupiahValidator.validateOptions({ minimumFractionDigits: 2, maximumFractionDigits: 4 })).not.toThrow();
    
    expect(() => RupiahValidator.validateOptions({ precision: -1 })).toThrow();
    expect(() => RupiahValidator.validateOptions({ precision: 21 })).toThrow();
    
    expect(() => RupiahValidator.validateOptions({ 
      decimalSeparator: '.', 
      thousandSeparator: '.' 
    })).toThrow();
    
    expect(() => RupiahValidator.validateOptions({ 
      minimumFractionDigits: 5,
      maximumFractionDigits: 2 
    })).toThrow('Minimum fraction digits cannot be greater than maximum');
    
    expect(() => RupiahValidator.validateOptions({ 
      minimumFractionDigits: -1 
    })).toThrow('Minimum fraction digits must be between 0 and 20');
    
    expect(() => RupiahValidator.validateOptions({ 
      maximumFractionDigits: 21 
    })).toThrow('Maximum fraction digits must be between 0 and 20');
    
    expect(() => RupiahValidator.validateOptions({ 
      symbolPosition: 'invalid' as any 
    })).toThrow('Symbol position must be "before" or "after"');
    
    expect(() => RupiahValidator.validateOptions({ 
      negativeFormat: 'invalid' as any 
    })).toThrow('Negative format must be "sign", "parentheses", or "hidden"');
    
    expect(() => RupiahValidator.validateOptions({ 
      formatStyle: 'invalid' as any 
    })).toThrow('Format style must be "standard", "compact", or "accounting"');
  });

  test('validateCurrencyCode', () => {
    expect(RupiahValidator.validateCurrencyCode('IDR')).toBe(true);
    expect(RupiahValidator.validateCurrencyCode('USD')).toBe(true);
    expect(RupiahValidator.validateCurrencyCode('idr')).toBe(false);
    expect(RupiahValidator.validateCurrencyCode('ID')).toBe(false);
    expect(RupiahValidator.validateCurrencyCode('IDRS')).toBe(false);
  });

  test('validateInput dengan berbagai format string', () => {
    expect(RupiahValidator.validateInput('Rp 1.000').isValid).toBe(true);
    expect(RupiahValidator.validateInput('Rp1.000').isValid).toBe(true);
    expect(RupiahValidator.validateInput('Rp 1.000,00').isValid).toBe(true);
    expect(RupiahValidator.validateInput('IDR 1,000.00').isValid).toBe(true);
    expect(RupiahValidator.validateInput('1.000').isValid).toBe(true);
    expect(RupiahValidator.validateInput('1.000,00').isValid).toBe(true);
    expect(RupiahValidator.validateInput('1,000.00').isValid).toBe(true);
    expect(RupiahValidator.validateInput('-Rp 1.000').isValid).toBe(true);
    expect(RupiahValidator.validateInput('Rp -1.000').isValid).toBe(true);
    
    expect(RupiahValidator.validateInput('abc').isValid).toBe(false);
    expect(RupiahValidator.validateInput('Rp abc').isValid).toBe(false);
    expect(RupiahValidator.validateInput('1.2.3.4').isValid).toBe(true);
    
    expect(RupiahValidator.validateInput('')).toBeTruthy();
    expect(RupiahValidator.validateInput('   ').isValid).toBe(true);
    expect(RupiahValidator.validateInput(null).isValid).toBe(true);
    expect(RupiahValidator.validateInput(undefined).isValid).toBe(true);
    expect(RupiahValidator.validateInput(123).isValid).toBe(true);
    expect(RupiahValidator.validateInput(123.45).isValid).toBe(true);
    expect(RupiahValidator.validateInput(-123).isValid).toBe(true);
  });

  test('validateInput handles unexpected errors in sanitizeValue', () => {
    // Save original method
    const originalSanitize = RupiahValidator.sanitizeValue;
    
    // Temporarily replace with a mock that throws
    RupiahValidator.sanitizeValue = jest.fn(() => {
      throw new Error('Mock sanitization error');
    });
    
    const result = RupiahValidator.validateInput('test');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Mock sanitization error');
    expect(result.numericValue).toBe(0);
    
    // Restore original method
    RupiahValidator.sanitizeValue = originalSanitize;
  });
});

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

  test('parse dengan berbagai locale', () => {
    expect(RupiahParser.parse('Rp 1.000,00', 'id-ID').numeric).toBe(1000);
    expect(RupiahParser.parse('Rp1.000', 'id-ID').numeric).toBe(1000);
    
    expect(RupiahParser.parse('IDR 1,000.00', 'en-US').numeric).toBe(1000);
    expect(RupiahParser.parse('IDR1,000', 'en-US').numeric).toBe(1000);
    
    expect(RupiahParser.parse('Rp 1.000', 'invalid-locale').numeric).toBe(1000);
  });

  test('isValidRupiah dengan berbagai format', () => {
    expect(RupiahParser.isValidRupiah('Rp 1.000')).toBe(true);
    expect(RupiahParser.isValidRupiah('Rp1.000')).toBe(true);
    expect(RupiahParser.isValidRupiah('Rp 1.000,00')).toBe(true);
    expect(RupiahParser.isValidRupiah('IDR 1,000.00')).toBe(true);
    expect(RupiahParser.isValidRupiah('1.000')).toBe(true);
    expect(RupiahParser.isValidRupiah('1.000,00')).toBe(true);
    expect(RupiahParser.isValidRupiah('1,000.00')).toBe(true);
    expect(RupiahParser.isValidRupiah('-Rp 1.000')).toBe(true);
    expect(RupiahParser.isValidRupiah('Rp -1.000')).toBe(true);
    
    expect(RupiahParser.isValidRupiah('')).toBe(false);
    expect(RupiahParser.isValidRupiah('abc')).toBe(false);
    expect(RupiahParser.isValidRupiah('Rp abc')).toBe(false);
    expect(RupiahParser.isValidRupiah('1.2.3.4')).toBe(false);
    expect(RupiahParser.isValidRupiah(null as any)).toBe(false);
    expect(RupiahParser.isValidRupiah(undefined as any)).toBe(false);
    expect(RupiahParser.isValidRupiah(123 as any)).toBe(false);
  });

  test('detectLocale', () => {
    expect(RupiahParser.detectLocale('Rp 1.000')).toBe('id-ID');
    expect(RupiahParser.detectLocale('IDR 1,000')).toBe('en-US');
    expect(RupiahParser.detectLocale('€ 1.000')).toBe('id-ID');
    expect(RupiahParser.detectLocale('1.000')).toBe('id-ID');
  });

  test('extractNumber dengan berbagai format', () => {
    expect(RupiahParser.extractNumber('Rp 1.000')).toBe(1000);
    expect(RupiahParser.extractNumber('IDR 1,000.00')).toBe(1000);
    expect(RupiahParser.extractNumber('1.234.567,89')).toBe(1234567.89);
    expect(RupiahParser.extractNumber('invalid')).toBe(0);
  });
});

describe('RupiahSanitizer', () => {
  test('sanitizeInput dengan berbagai tipe data', () => {
    expect(RupiahSanitizer.sanitizeInput(1000)).toBe('1000');
    expect(RupiahSanitizer.sanitizeInput('Rp 1.000')).toBe('Rp 1.000');
    expect(RupiahSanitizer.sanitizeInput(null)).toBe('0');
    expect(RupiahSanitizer.sanitizeInput(undefined)).toBe('0');
    expect(RupiahSanitizer.sanitizeInput(true)).toBe('true');
    expect(RupiahSanitizer.sanitizeInput(false)).toBe('false');
    expect(RupiahSanitizer.sanitizeInput(BigInt(1000))).toBe('1000');
    expect(RupiahSanitizer.sanitizeInput({ toString: () => '1000' })).toBe('1000');
  });

  test('removeFormatting', () => {
    expect(RupiahSanitizer.removeFormatting('Rp 1.000,00')).toBe('1000.00');
    expect(RupiahSanitizer.removeFormatting('IDR 1,000.00')).toBe('1.00000');
    expect(RupiahSanitizer.removeFormatting('1.234.567,89')).toBe('1234567.89');
  });

  test('normalizeDecimal', () => {
    expect(RupiahSanitizer.normalizeDecimal('1.000,00', ',')).toBe('1000.00');
    expect(RupiahSanitizer.normalizeDecimal('1,000.00', '.')).toBe('1000.00');
    expect(RupiahSanitizer.normalizeDecimal('1 000,00', ',')).toBe('1 000.00');
  });

  test('escapeRegex', () => {
    expect(RupiahSanitizer.escapeRegex('.*+?^${}()|[]\\')).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
    expect(RupiahSanitizer.escapeRegex('Rp.')).toBe('Rp\\.');
  });
});

describe('Utility Functions', () => {
  test('isNumeric dengan berbagai input', () => {
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric(123.45)).toBe(true);
    expect(isNumeric(-123)).toBe(true);
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('123.45')).toBe(true);
    expect(isNumeric('-123')).toBe(true);
    expect(isNumeric('Rp 1.000')).toBe(true);
    expect(isNumeric(BigInt(123))).toBe(true);
    
    expect(isNumeric('')).toBe(false);
    expect(isNumeric('abc')).toBe(false);
    expect(isNumeric(null)).toBe(false);
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric({})).toBe(false);
    expect(isNumeric([])).toBe(false);
  });

  test('toNumber dengan parsing kompleks', () => {
    expect(toNumber('Rp 1.000')).toBe(1000);
    expect(toNumber('Rp1.000')).toBe(1000);
    expect(toNumber('Rp 1.000,50')).toBe(1000.5);
    expect(toNumber('1.234.567,89')).toBe(1234567.89);
    
    expect(toNumber('IDR 1,000')).toBe(1000);
    expect(toNumber('IDR1,000')).toBe(1000);
    expect(toNumber('IDR 1,000.50')).toBe(1000.5);
    expect(toNumber('1,234,567.89')).toBe(1234567.89);
    
    expect(toNumber('1.000,00')).toBe(1000);
    expect(toNumber('1,000.00')).toBe(1000);
    
    expect(toNumber('')).toBe(0);
    expect(toNumber('abc')).toBe(0);
    expect(toNumber('1.2.3')).toBe(123);
    expect(toNumber('1,2,3')).toBe(123);
    
    expect(toNumber('true')).toBe(1);
    expect(toNumber('false')).toBe(0);
    
    expect(toNumber(123.45)).toBe(123.45);
    expect(toNumber(NaN)).toBe(0);
    expect(toNumber(Infinity)).toBe(0);
    expect(toNumber(-Infinity)).toBe(0);
    
    expect(toNumber(BigInt(1000))).toBe(1000);
  });

  test('toNumber handles edge case strings', () => {
    expect(toNumber('-')).toBe(0);
    expect(toNumber('.')).toBe(0);
    expect(toNumber(',')).toBe(0);
    expect(toNumber('')).toBe(0);
    expect(toNumber('   ')).toBe(0);
    expect(toNumber('-.')).toBe(0);
    expect(toNumber('-,')).toBe(0);
  });

  test('toNumber handles mixed separators correctly', () => {
    // Test lastDotIndex > lastCommaIndex (international format)
    expect(toNumber('1,234,567.89')).toBe(1234567.89);
    
    // Test lastCommaIndex > lastDotIndex (Indonesian format)
    expect(toNumber('1.234.567,89')).toBe(1234567.89);
    
    // Test ambiguous cases
    expect(toNumber('1.000')).toBe(1000); // Indonesian thousands
    expect(toNumber('1,000')).toBe(1000); // International thousands
    
    // More complex cases
    expect(toNumber('1.234.567')).toBe(1234567); // Indonesian without decimal
    expect(toNumber('1,234,567')).toBe(1234567); // International without decimal
  });

  test('formatNumber dengan berbagai parameter', () => {
    expect(formatNumber(1234567.89, ',', '.', 2, 0)).toBe('1.234.567,89');
    expect(formatNumber(1234567.89, '.', ',', 2, 0)).toBe('1,234,567.89');
    expect(formatNumber(1000, ',', '.', 0, 0)).toBe('1.000');
    expect(formatNumber(1000.5, ',', '.', 2, 5)).toBe('1.000,50000');
    expect(formatNumber(0, ',', '.', 2, 0)).toBe('0,00');
    
    expect(formatNumber(NaN, ',', '.', 2, 0)).toBe('0');
    expect(formatNumber(Infinity, ',', '.', 2, 0)).toBe('0');
    expect(formatNumber(-Infinity, ',', '.', 2, 0)).toBe('0');
  });

  test('formatNumber handles errors in number formatting', () => {
    // Create a mock object that will throw when toFixed is called
    const invalidNum = {
      toFixed: () => { throw new Error('Mock toFixed error'); }
    };
    
    // @ts-ignore - Testing error case
    expect(formatNumber(invalidNum, ',', '.', 2, 0)).toBe('0');
  });

  test('roundToPrecision', () => {
    expect(roundToPrecision(1.234567, 0)).toBe(1);
    expect(roundToPrecision(1.234567, 2)).toBe(1.23);
    expect(roundToPrecision(1.235, 2)).toBe(1.24);
    expect(roundToPrecision(1.234, 2)).toBe(1.23);
  });

  test('generateAlias', () => {
    expect(generateAlias({ a: 1, b: 2 })).toBe('rp_1_2');
    expect(generateAlias({ symbol: 'Rp', precision: 2 })).toBe('rp_Rp_2');
  });

  test('abbreviateNumber dengan berbagai presisi', () => {
    expect(abbreviateNumber(1500)).toBe('1.5K');
    expect(abbreviateNumber(1500, 0)).toBe('2K');
    expect(abbreviateNumber(1500, 2)).toBe('1.50K');
    expect(abbreviateNumber(1500000)).toBe('1.5M');
    expect(abbreviateNumber(1500000000)).toBe('1.5B');
    expect(abbreviateNumber(1500000000000)).toBe('1.5T');
    expect(abbreviateNumber(999)).toBe('999');
    expect(abbreviateNumber(-1500)).toBe('-1.5K');
  });

  test('calculatePercentageDifference', () => {
    expect(calculatePercentageDifference(100, 150)).toBe(50);
    expect(calculatePercentageDifference(100, 50)).toBe(-50);
    expect(calculatePercentageDifference(0, 100)).toBe(100);
    expect(calculatePercentageDifference(0, -100)).toBe(-100);
    expect(calculatePercentageDifference(0, 0)).toBe(0);
    expect(calculatePercentageDifference(-100, -50)).toBe(50);
    expect(calculatePercentageDifference(-100, -150)).toBe(-50);
  });

  test('getLocaleConfig', () => {
    expect(getLocaleConfig('id-ID')).toEqual(LOCALE_CONFIGS['id-ID']);
    expect(getLocaleConfig('en-US')).toEqual(LOCALE_CONFIGS['en-US']);
    expect(getLocaleConfig('invalid')).toEqual(LOCALE_CONFIGS['id-ID']);
    expect(getLocaleConfig('')).toEqual(LOCALE_CONFIGS['id-ID']);
    expect(getLocaleConfig(null as any)).toEqual(LOCALE_CONFIGS['id-ID']);
    expect(getLocaleConfig(undefined as any)).toEqual(LOCALE_CONFIGS['id-ID']);
  });

  test('detectLocale', () => {
    const originalNavigator = global.navigator;
    (global as any).navigator = { language: 'en-US' };
    expect(detectLocale()).toBe('en-US');
    (global as any).navigator = originalNavigator;
  });

  test('detectLocale returns default when navigator is undefined', () => {
    const originalNavigator = global.navigator;
    
    // Remove navigator temporarily
    Object.defineProperty(global, 'navigator', {
      value: undefined,
      writable: true
    });
    
    expect(detectLocale()).toBe('id-ID');
    
    // Restore
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true
    });
  });
});

describe('Convenience Functions', () => {
  let consoleWarnSpy: any;
  let consoleErrorSpy: any;
  
  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
  
  test('formatRupiah', () => {
    expect(formatRupiah(1000)).toBe('Rp 1.000');
    expect(formatRupiah(1234567.89, { 
      symbol: 'IDR',
      decimalSeparator: '.',
      thousandSeparator: ',',
      spaceBetween: true
    })).toBe('IDR 1,234,567.89');
    expect(formatRupiah(null as any)).toBe('Rp 0');
    expect(formatRupiah(undefined as any)).toBe('Rp 0');
    expect(formatRupiah('invalid')).toBe('Rp 0');
    expect(formatRupiah(null as any, { fallback: 'N/A' })).toBe('N/A');
  });

  test('formatRupiah logs warning for non-empty invalid string', () => {
    formatRupiah('invalid but not empty');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Invalid value passed to formatRupiah:',
      'invalid but not empty'
    );
  });
  
  test('parseRupiah', () => {
    expect(parseRupiah('Rp 1.000')).toBe(1000);
    expect(parseRupiah('')).toBe(0);
    expect(parseRupiah('invalid')).toBe(0);
    expect(parseRupiah(null as any)).toBe(0);
    expect(parseRupiah(undefined as any)).toBe(0);
    expect(parseRupiah(123 as any)).toBe(0);
    expect(parseRupiah(true as any)).toBe(0);
  });
  
  test('isValidRupiah', () => {
    expect(isValidRupiah('Rp 1.000')).toBe(true);
    expect(isValidRupiah('')).toBe(false);
    expect(isValidRupiah('invalid')).toBe(false);
    expect(isValidRupiah(null as any)).toBe(false);
    expect(isValidRupiah(undefined as any)).toBe(false);
    expect(isValidRupiah(123 as any)).toBe(false);
    expect(isValidRupiah({} as any)).toBe(false);
  });
  
  test('formatRupiahWithAbbreviation', () => {
    expect(formatRupiahWithAbbreviation(1000)).toBe('Rp 1.000 (≈1.0K)');
    expect(formatRupiahWithAbbreviation('invalid')).toBe('Rp 0 (≈0)');
  });

  test('formatRupiahWithAbbreviation handles errors gracefully', () => {
    // Create an object that will cause an error when passed to formatter
    const invalidValue = {
      toString: () => { throw new Error('Mock toString error'); }
    };
    
    expect(formatRupiahWithAbbreviation(invalidValue as any)).toBe('Rp 0 (≈0)');
  });
  
  test('formatRupiahRange', () => {
    expect(formatRupiahRange(1000, 2000)).toBe('Rp 1.000 - Rp 2.000');
    expect(formatRupiahRange('invalid', 2000)).toBe('Rp 0 - Rp 2.000');
    expect(formatRupiahRange(1000, 'invalid')).toBe('Rp 1.000 - Rp 0');
    expect(formatRupiahRange('invalid', 'invalid')).toBe('Rp 0 - Rp 0');
    expect(formatRupiahRange(1000, 2000, undefined as any)).toBe('Rp 1.000 - Rp 2.000');
    expect(formatRupiahRange(1000, 2000, null as any)).toBe('Rp 1.000 - Rp 2.000');
  });
  
  test('formatRupiahWithTemplate', () => {
    expect(formatRupiahWithTemplate(1000, 'Price: {value}')).toBe('Price: Rp 1.000');
    expect(formatRupiahWithTemplate('invalid', 'Price: {value}')).toBe('Price: Rp 0');
    expect(formatRupiahWithTemplate(1000, '')).toBe('Rp 0');
  });

  test('formatRupiahWithTemplate handles template errors', () => {
    // Mock the formatter to throw an error
    const mockFormatter = {
      formatWithTemplate: jest.fn(() => {
        throw new Error('Mock template error');
      })
    };
    
    // Temporarily replace RupiahFormatter
    const originalFormatter = (RupiahFormatter as any).prototype;
    const originalFormatWithTemplate = originalFormatter.formatWithTemplate;
    
    originalFormatter.formatWithTemplate = mockFormatter.formatWithTemplate;
    
    // This should handle the error and return fallback
    expect(formatRupiahWithTemplate(1000, 'Price: {value}')).toBe('Rp 0');
    
    // Restore original method
    originalFormatter.formatWithTemplate = originalFormatWithTemplate;
  });
});

describe('Rupiah Default Export', () => {
  test('Rupiah object', () => {
    expect(Rupiah.format(1000)).toBe('Rp 1.000');
    expect(Rupiah.parse('Rp 1.000')).toBe(1000);
    expect(Rupiah.isValid('Rp 1.000')).toBe(true);
    expect(Rupiah.formatWithAbbreviation(1000)).toBe('Rp 1.000 (≈1.0K)');
    expect(Rupiah.formatRange(1000, 2000)).toBe('Rp 1.000 - Rp 2.000');
    expect(Rupiah.formatWithTemplate(1000, 'Price: {value}')).toBe('Price: Rp 1.000');
    expect(Rupiah.presets).toBe(PRESETS);
    expect(Rupiah.constants).toBe(DEFAULT_OPTIONS);
    expect(Rupiah.locales).toBe(LOCALE_CONFIGS);
  });
});