/**
 * Comprehensive tests for Rupiah Formatter v3.0.0
 */

import {
  formatRupiah,
  parseRupiah,
  validateRupiah,
  isValidRupiah,
  createFormatter,
  RupiahFormatter,
  PRESETS,
  toNumber,
  roundNumber,
  formatWithSeparators
} from '../src/index';
import { CachePlugin, CompactPlugin, WordsPlugin } from '../src/plugins';

describe('Rupiah Formatter v3.0.0', () => {
  describe('Core Functionality', () => {
    test('formatRupiah with default options', () => {
      expect(formatRupiah(1000)).toBe('Rp1.000,00');
      expect(formatRupiah(1234567.89)).toBe('Rp1.234.567,89');
      // Tanda minus di depan simbol
      expect(formatRupiah(-5000)).toBe('-Rp5.000,00');
    });
    
    test('formatRupiah with preset', () => {
      expect(formatRupiah(1234567.89, 'ECOMMERCE')).toBe('Rp1.234.568');
      // Tanda kurung membungkus simbol dan angka
      expect(formatRupiah(-5000, 'ACCOUNTING')).toBe('(Rp5.000,00)');
      expect(formatRupiah(1234567.89, 'FINANCIAL')).toBe('IDR 1,234,567.89');
    });
    
    test('parseRupiah', () => {
      expect(parseRupiah('Rp1.000,00')).toBe(1000);
      expect(parseRupiah('Rp1.234.567,89')).toBe(1234567.89);
      expect(parseRupiah('-Rp5.000,00')).toBe(-5000);
      expect(parseRupiah('(Rp5.000,00)')).toBe(-5000);
    });
    
    test('validateRupiah', () => {
      expect(validateRupiah(1000).isValid).toBe(true);
      expect(validateRupiah('invalid').isValid).toBe(false);
      expect(validateRupiah(null).isValid).toBe(false);
    });
    
    test('isValidRupiah', () => {
      expect(isValidRupiah('Rp1.000,00')).toBe(true);
      expect(isValidRupiah('Rp 1.000,00')).toBe(true);
      expect(isValidRupiah('invalid')).toBe(false);
    });
    
    test('formatRupiah negative formats', () => {
      expect(formatRupiah(-5000, { negativeFormat: 'sign' })).toBe('-Rp5.000,00');
      expect(formatRupiah(-5000, { negativeFormat: 'parentheses' })).toBe('(Rp5.000,00)');
      expect(formatRupiah(-5000, { negativeFormat: 'braces' })).toBe('[Rp5.000,00]');
      expect(formatRupiah(-5000, { negativeFormat: 'none' })).toBe('Rp5.000,00');
    });
  });
  
  describe('AdvancedRupiahFormatter', () => {
    let formatter: RupiahFormatter;
    
    beforeEach(() => {
      formatter = createFormatter({}, []); // No plugins
      // Reset to default options
      formatter.setOptions({ ...PRESETS.BI_STANDARD });
    });
    
    test('format with different options', () => {
      formatter.setOptions({ precision: 0 });
      expect(formatter.format(1234.56)).toBe('Rp1.235');
      
      formatter.setOptions({ spaceBetween: true });
      expect(formatter.format(1000)).toBe('Rp 1.000');
      
      formatter.setOptions({ 
        symbol: 'IDR', 
        thousandSeparator: ',', 
        decimalSeparator: '.',
        spaceBetween: true,
        precision: 2  // Reset precision ke 2
      });
      const result = formatter.format(1234567);
      expect(result).toBe('IDR 1,234,567.00');
    });
    
    test('formatRange', () => {
      expect(formatter.formatRange(1000, 5000)).toBe('Rp1.000,00 - Rp5.000,00');
      expect(formatter.formatRange(1000, 5000, ' s/d ')).toBe('Rp1.000,00 s/d Rp5.000,00');
    });
    
    test('formatList', () => {
      expect(formatter.formatList([1000, 2000, 3000])).toBe('Rp1.000,00, Rp2.000,00 dan Rp3.000,00');
      expect(formatter.formatList([1000])).toBe('Rp1.000,00');
    });
    
    test('batchFormat', () => {
      const values = [1000, 2000, 3000, 4000, 5000];
      const results = formatter.batchFormat(values);
      
      expect(results).toHaveLength(5);
      expect(results[0]).toBe('Rp1.000,00');
      expect(results[4]).toBe('Rp5.000,00');
    });
    
    test('analyze', () => {
      const analysis = formatter.analyze(1234567.89);
      
      expect(analysis.parsed).toBe(1234567.89);
      expect(analysis.formatted).toBe('Rp1.234.567,89');
      expect(analysis.isValid).toBe(true);
      expect(analysis.isInteger).toBe(false);
      expect(analysis.magnitude).toBe('million');
    });
  });
  
  describe('Plugins', () => {
    test('CachePlugin', () => {
      const formatter = createFormatter(PRESETS.BI_STANDARD, ['cache']);
      
      // First call should compute
      const result1 = formatter.format(1000);
      
      // Second call should use cache
      const result2 = formatter.format(1000);
      
      expect(result1).toBe(result2);
      expect(result1).toBe('Rp1.000,00');
      
      // Check cache stats
      const stats = (formatter as any).cacheStats();
      expect(stats.size).toBeGreaterThan(0);
    });
    
    test('CompactPlugin', () => {
      const formatter = createFormatter({ 
        ...PRESETS.BI_STANDARD, 
        compact: true, 
        compactThreshold: 10000,
        compactPrecision: 1 
      }, []); // No plugins to avoid interference
      
      expect(formatter.format(1000)).toBe('Rp1.000,00');
      expect(formatter.format(10000)).toBe('Rp10,0RB');
      expect(formatter.format(1000000)).toBe('Rp1,0JT');
    });
    
    test('CompactPlugin with autoDetect true', () => {
      const formatter = createFormatter(PRESETS.BI_STANDARD, [new CompactPlugin({ autoDetect: true })]);
      // Dengan autoDetect true, angka >= 1000 akan dicompact
      expect(formatter.format(999)).toBe('Rp999,00');
      expect(formatter.format(1000)).toBe('Rp1,0RB');
      expect(formatter.format(1000000)).toBe('Rp1,0JT');
    });
    
    test('CompactPlugin with custom units', () => {
      const formatter = createFormatter(PRESETS.BI_STANDARD, [new CompactPlugin({
        units: {
          thousand: 'K',
          million: 'M',
          billion: 'B',
          trillion: 'T'
        }
      })]);
      // Aktifkan compact di options
      formatter.setOptions({ compact: true, compactThreshold: 1000 });
      expect(formatter.format(1000)).toBe('Rp1,0K');
      expect(formatter.format(1000000)).toBe('Rp1,0M');
    });
    
    test('WordsPlugin', () => {
      const formatter = createFormatter(PRESETS.BI_STANDARD, ['words']);
      
      const words = (formatter as any).formatWords(1234567);
      expect(words).toContain('juta');
      expect(words).toContain('rupiah');
    });
  });
  
  describe('Utils', () => {
    test('toNumber', () => {
      expect(toNumber(1000)).toBe(1000);
      expect(toNumber('1.000,50')).toBe(1000.5);
      expect(toNumber('Rp1.000,00')).toBe(1000);
      expect(toNumber(null)).toBe(0);
      expect(toNumber(undefined)).toBe(0);
    });
    
    test('roundNumber', () => {
      expect(roundNumber(123.456, 2)).toBe(123.46);
      expect(roundNumber(123.456, 0)).toBe(123);
      expect(roundNumber(123.456, 2, 'floor')).toBe(123.45);
      expect(roundNumber(123.456, 2, 'ceil')).toBe(123.46);
    });
    
    test('formatWithSeparators', () => {
      expect(formatWithSeparators(1234567.89, ',', '.', 2)).toBe('1.234.567,89');
      expect(formatWithSeparators(1234567.89, '.', ',', 2)).toBe('1,234,567.89');
      expect(formatWithSeparators(1234567, ',', '.', 0, true)).toBe('1.234.567');
    });
  });
  
  describe('Presets', () => {
    test('BI_STANDARD preset', () => {
      const formatter = createFormatter('BI_STANDARD', []); // No plugins
      expect(formatter.format(1234567.89)).toBe('Rp1.234.567,89');
    });
    
    test('ECOMMERCE preset', () => {
      const formatter = createFormatter('ECOMMERCE', []); // No plugins
      expect(formatter.format(1234567.89)).toBe('Rp1.234.568');
      expect(formatter.format(0)).toBe('Gratis');
    });
    
    test('ACCOUNTING preset', () => {
      const formatter = createFormatter('ACCOUNTING', []); // No plugins
      expect(formatter.format(-5000)).toBe('(Rp5.000,00)');
    });
    
    test('FINANCIAL preset', () => {
      const formatter = createFormatter('FINANCIAL', []); // No plugins
      expect(formatter.format(1234567.89)).toBe('IDR 1,234,567.89');
    });
  });
  
  describe('Edge Cases', () => {
    test('Very large numbers', () => {
      expect(formatRupiah(999999999999.99)).toBe('Rp999.999.999.999,99');
      // Tanda minus di depan simbol
      expect(formatRupiah(-999999999999.99)).toBe('-Rp999.999.999.999,99');
    });
    
    test('Very small numbers', () => {
      expect(formatRupiah(0.01)).toBe('Rp0,01');
      expect(formatRupiah(0.005)).toBe('Rp0,01');
      expect(formatRupiah(0.004)).toBe('Rp0,00');
    });
    
    test('Zero and negative zero', () => {
      expect(formatRupiah(0)).toBe('Rp0,00');
      expect(formatRupiah(-0)).toBe('Rp0,00');
    });
    
    test('Invalid inputs', () => {
      expect(formatRupiah(NaN)).toBe('Rp0');
      expect(formatRupiah(Infinity)).toBe('Rp0');
      expect(formatRupiah('')).toBe('Rp0');
      expect(formatRupiah(null)).toBe('Rp0');
      expect(formatRupiah(undefined)).toBe('Rp0');
    });
    
    test('String inputs with various formats', () => {
      expect(formatRupiah('1000')).toBe('Rp1.000,00');
      expect(formatRupiah('1.000,50')).toBe('Rp1.000,50');
      expect(formatRupiah('Rp1.000,00')).toBe('Rp1.000,00');
      expect(formatRupiah('IDR 1,000.00')).toBe('Rp1.000,00');
    });
  });
  
  describe('Performance', () => {
    test('format performance', () => {
      const iterations = 1000;
      const values = Array.from({ length: iterations }, (_, i) => i * 1000);
      
      const start = performance.now();
      
      for (const value of values) {
        formatRupiah(value);
      }
      
      const totalTime = performance.now() - start;
      const averageTime = totalTime / iterations;
      
      console.log(`Average format time: ${averageTime.toFixed(3)}ms`);
      console.log(`Operations per second: ${Math.floor(1000 / averageTime)}`);
      
      expect(averageTime).toBeLessThan(0.5);
    });
    
    test('parse performance', () => {
      const iterations = 1000;
      const formattedValues = Array.from(
        { length: iterations }, 
        (_, i) => `Rp${(i * 1000).toLocaleString('id-ID')},00`
      );
      
      const start = performance.now();
      
      for (const value of formattedValues) {
        parseRupiah(value);
      }
      
      const totalTime = performance.now() - start;
      const averageTime = totalTime / iterations;
      
      console.log(`Average parse time: ${averageTime.toFixed(3)}ms`);
      console.log(`Operations per second: ${Math.floor(1000 / averageTime)}`);
      
      expect(averageTime).toBeLessThan(0.3);
    });
  });
  
  describe('Compact Plugin Specific Tests', () => {
    test('CompactPlugin dengan threshold berbeda', () => {
      const formatter = createFormatter({ 
        ...PRESETS.BI_STANDARD,
        compact: true,
        compactThreshold: 100000,
        compactPrecision: 2
      }, []);
      
      expect(formatter.format(99999)).toBe('Rp99.999,00');
      expect(formatter.format(100000)).toBe('Rp100,00RB');
      expect(formatter.format(1000000)).toBe('Rp1,00JT');
    });
    
    test('CompactPlugin dengan stripTrailingZero', () => {
      const formatter = createFormatter({ 
        ...PRESETS.BI_STANDARD,
        compact: true,
        compactThreshold: 1000,
        compactPrecision: 2,
        stripTrailingZero: true
      }, []);
      
      expect(formatter.format(1000)).toBe('Rp1RB');
      expect(formatter.format(1500)).toBe('Rp1,5RB');
      expect(formatter.format(1000000)).toBe('Rp1JT');
    });
  });
});