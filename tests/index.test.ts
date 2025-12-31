// tests/index.test.ts
import Rupiah, {
  formatRupiah,
  RupiahFormatter,
  parseRupiah,
  isValidRupiah,
  BI_STANDARD,
  FORMAT_PRESETS,
  FormatOptions
} from '../src/index';

describe('Rupiah Formatter Library - Comprehensive Tests', () => {
  // ============================================
  // 1. Test formatRupiah function (main export)
  // ============================================
  describe('formatRupiah function', () => {
    test('should format positive numbers with default options', () => {
      expect(formatRupiah(1000)).toBe('Rp1.000,00');
      expect(formatRupiah(1234567)).toBe('Rp1.234.567,00');
      expect(formatRupiah(1234.56)).toBe('Rp1.234,56');
    });

    test('should format negative numbers with default options', () => {
      expect(formatRupiah(-1000)).toBe('-Rp1.000,00');
      expect(formatRupiah(-1234.56)).toBe('-Rp1.234,56');
    });

    test('should handle string inputs', () => {
      expect(formatRupiah('1000')).toBe('Rp1.000,00');
      // String dengan koma desimal sesuai format Indonesia
      expect(formatRupiah('1234,56')).toBe('Rp1.234,56');
      expect(formatRupiah('-500')).toBe('-Rp500,00');
    });

    test('should return fallback for zero/invalid values', () => {
      expect(formatRupiah(0)).toBe('Rp0');
      expect(formatRupiah(NaN)).toBe('Rp0');
      expect(formatRupiah(Infinity)).toBe('Rp0');
      expect(formatRupiah('invalid')).toBe('Rp0');
    });

    test('should respect custom options', () => {
      const options: FormatOptions = {
        symbol: 'IDR',
        thousandSeparator: ',',
        decimalSeparator: '.',
        spaceBetween: true,
        precision: 3
      };
      expect(formatRupiah(1234567.89, options)).toBe('IDR 1,234,567.890');
    });
  });

  // ============================================
  // 2. Test RupiahFormatter class
  // ============================================
  describe('RupiahFormatter class', () => {
    let formatter: RupiahFormatter;

    beforeEach(() => {
      formatter = new RupiahFormatter();
    });

    test('should format with default settings', () => {
      expect(formatter.format(1234567)).toBe('Rp1.234.567,00');
      expect(formatter.format(1234.56)).toBe('Rp1.234,56');
    });

    test('should parse formatted strings', () => {
      expect(formatter.parse('Rp1.234.567')).toBe(1234567);
      expect(formatter.parse('Rp1.234,56')).toBe(1234.56);
      expect(formatter.parse('-Rp500')).toBe(-500);
    });

    test('should format range', () => {
      expect(formatter.formatRange(1000, 2000)).toBe('Rp1.000,00 - Rp2.000,00');
      expect(formatter.formatRange('500', '1500', ' sampai ')).toBe('Rp500,00 sampai Rp1.500,00');
    });

    test('should handle negative formats', () => {
      const accountingFormatter = new RupiahFormatter({
        negativeFormat: 'parentheses'
      });
      expect(accountingFormatter.format(-1000)).toBe('Rp(1.000,00)');
    });

    test('should validate options', () => {
      expect(() => new RupiahFormatter({
        decimalSeparator: '.',
        thousandSeparator: '.' // Same as decimal separator
      })).toThrow('Decimal and thousand separators cannot be the same');

      expect(() => new RupiahFormatter({
        precision: -1
      })).toThrow('Precision must be between 0 and 20');

      expect(() => new RupiahFormatter({
        precision: 21
      })).toThrow('Precision must be between 0 and 20');
    });

    test('static format method should work', () => {
      expect(RupiahFormatter.format(1234567)).toBe('Rp1.234.567,00');
      expect(RupiahFormatter.format(1234.56, { precision: 0 })).toBe('Rp1.235');
    });

    test('static parse method should work', () => {
      expect(RupiahFormatter.parse('Rp1.234.567')).toBe(1234567);
      expect(RupiahFormatter.parse('Rp1.234,56')).toBe(1234.56);
    });
  });

  // ============================================
  // 3. Test parser functions
  // ============================================
  describe('Parser functions', () => {
    test('parseRupiah should parse valid strings', () => {
      expect(parseRupiah('Rp1.234.567')).toBe(1234567);
      expect(parseRupiah('Rp1.234,56')).toBe(1234.56);
      expect(parseRupiah('-Rp500')).toBe(-500);
      // Catatan: parseRupiah hanya mendeteksi format dengan simbol Rp
      // expect(parseRupiah('IDR 1,234.56')).toBe(1234.56);
    });

    test('parseRupiah should return 0 for invalid inputs', () => {
      expect(parseRupiah('')).toBe(0);
      expect(parseRupiah('invalid')).toBe(0);
      expect(parseRupiah(null as any)).toBe(0);
      expect(parseRupiah(undefined as any)).toBe(0);
    });

    test('isValidRupiah should validate BI standard format', () => {
      expect(isValidRupiah('Rp1.234.567')).toBe(true);
      expect(isValidRupiah('Rp1.234,56')).toBe(true);
      expect(isValidRupiah('-Rp500')).toBe(true);
      expect(isValidRupiah('Rp0')).toBe(true);
      
      expect(isValidRupiah('1.234.567')).toBe(false);
      expect(isValidRupiah('IDR 1,234.56')).toBe(false);
      expect(isValidRupiah('invalid')).toBe(false);
    });
  });

  // ============================================
  // 4. Test constants and presets
  // ============================================
  describe('Constants and presets', () => {
    test('BI_STANDARD should have correct values', () => {
      expect(BI_STANDARD.symbol).toBe('Rp');
      expect(BI_STANDARD.decimalSeparator).toBe(',');
      expect(BI_STANDARD.thousandSeparator).toBe('.');
      expect(BI_STANDARD.symbolPosition).toBe('before');
      expect(BI_STANDARD.precision).toBe(2);
      expect(BI_STANDARD.stripTrailingZero).toBe(false);
      expect(BI_STANDARD.spaceBetween).toBe(false);
    });

    test('FORMAT_PRESETS should work correctly', () => {
      // STANDARD preset
      expect(formatRupiah(1234.56, FORMAT_PRESETS.STANDARD)).toBe('Rp1.234,56');
      
      // NO_DECIMAL preset
      expect(formatRupiah(1234.56, FORMAT_PRESETS.NO_DECIMAL)).toBe('Rp1.235');
      expect(formatRupiah(1234.00, FORMAT_PRESETS.NO_DECIMAL)).toBe('Rp1.234');
      
      // COMPACT preset
      expect(formatRupiah(1234567, FORMAT_PRESETS.COMPACT)).toBe('Rp1.234.567');
      
      // ACCOUNTING preset
      expect(formatRupiah(-1234.56, FORMAT_PRESETS.ACCOUNTING)).toBe('Rp(1.234,56)');
    });
  });

  // ============================================
  // 5. Test default export (Rupiah object)
  // ============================================
  describe('Default export (Rupiah object)', () => {
    test('should have all expected methods and properties', () => {
      expect(typeof Rupiah.format).toBe('function');
      expect(typeof Rupiah.parse).toBe('function');
      expect(typeof Rupiah.isValid).toBe('function');
      expect(typeof Rupiah.Formatter).toBe('function');
      expect(Rupiah.STANDARD).toBe(BI_STANDARD);
      expect(Rupiah.PRESETS).toBe(FORMAT_PRESETS);
    });

    test('methods should work correctly', () => {
      expect(Rupiah.format(1234567)).toBe('Rp1.234.567,00');
      expect(Rupiah.parse('Rp1.234.567')).toBe(1234567);
      expect(Rupiah.isValid('Rp1.234.567')).toBe(true);
      expect(new Rupiah.Formatter().format(1234567)).toBe('Rp1.234.567,00');
    });
  });

  // ============================================
  // 6. Edge cases and special scenarios
  // ============================================
  describe('Edge cases and special scenarios', () => {
    test('should handle very large numbers', () => {
      expect(formatRupiah(999999999999.99)).toBe('Rp999.999.999.999,99');
      expect(formatRupiah(-999999999999.99)).toBe('-Rp999.999.999.999,99');
    });

    test('should handle very small numbers', () => {
      expect(formatRupiah(0.01)).toBe('Rp0,01');
      expect(formatRupiah(0.005)).toBe('Rp0,01'); // Pembulatan
      expect(formatRupiah(0.004)).toBe('Rp0,00');
    });

    test('should handle different precisions', () => {
      expect(formatRupiah(1234.5678, { precision: 0 })).toBe('Rp1.235');
      expect(formatRupiah(1234.5678, { precision: 1 })).toBe('Rp1.234,6');
      expect(formatRupiah(1234.5678, { precision: 3 })).toBe('Rp1.234,568');
      expect(formatRupiah(1234.5678, { precision: 4 })).toBe('Rp1.234,5678');
    });

    test('should handle symbol after number', () => {
      const options: FormatOptions = {
        symbolPosition: 'after',
        spaceBetween: true
      };
      expect(formatRupiah(1234567, options)).toBe('1.234.567,00 Rp');
      expect(formatRupiah(-1234567, options)).toBe('-1.234.567,00 Rp');
    });

    test('should handle different separators', () => {
      const options: FormatOptions = {
        thousandSeparator: ',',
        decimalSeparator: '.',
        spaceBetween: true
      };
      expect(formatRupiah(1234567.89, options)).toBe('Rp 1,234,567.89');
    });

    test('should handle no symbol', () => {
      const options: FormatOptions = {
        symbol: '',
        spaceBetween: false
      };
      expect(formatRupiah(1234567, options)).toBe('1.234.567,00');
    });

    test('should handle empty/undefined/null inputs gracefully', () => {
      expect(formatRupiah('')).toBe('Rp0');
      expect(formatRupiah(null as any)).toBe('Rp0');
      expect(formatRupiah(undefined as any)).toBe('Rp0');
    });

    test('should handle scientific notation for numbers', () => {
      expect(formatRupiah(1.23e6)).toBe('Rp1.230.000,00');
      // Catatan: scientific notation string tidak didukung
    });
  });

  // ============================================
  // 7. Integration tests
  // ============================================
  describe('Integration tests', () => {
    test('format -> parse roundtrip', () => {
      const testValues = [1234567, 1234.56, -500, 0.01, 999999999.99];
      
      testValues.forEach(value => {
        const formatted = formatRupiah(value);
        const parsed = parseRupiah(formatted);
        expect(parsed).toBeCloseTo(value, 2);
      });
    });

    test('Formatter instance format -> parse roundtrip', () => {
      const formatter = new RupiahFormatter();
      const testValues = [1234567, 1234.56, -500];
      
      testValues.forEach(value => {
        const formatted = formatter.format(value);
        const parsed = formatter.parse(formatted);
        expect(parsed).toBeCloseTo(value, 2);
      });
    });

    test('custom formatter with different options', () => {
      const customFormatter = new RupiahFormatter({
        symbol: 'IDR',
        thousandSeparator: ',',
        decimalSeparator: '.',
        spaceBetween: true,
        precision: 3,
        negativeFormat: 'parentheses'
      });

      expect(customFormatter.format(1234567.89)).toBe('IDR 1,234,567.890');
      expect(customFormatter.format(-1234567.89)).toBe('IDR (1,234,567.890)');
      
      // Parse what was formatted
      const formatted = customFormatter.format(1234567.89);
      const parsed = customFormatter.parse(formatted);
      expect(parsed).toBeCloseTo(1234567.89, 3);
    });
  });
});