import { describe, test, expect } from '@jest/globals';
import { 
  isNumeric, 
  toNumber, 
  roundToPrecision,
  generateAlias 
} from '../src';

describe('Utilities', () => {
  test('isNumeric checks numeric values', () => {
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('Rp 1.000')).toBe(true);
    expect(isNumeric('abc')).toBe(false);
    expect(isNumeric(null)).toBe(false);
  });
  
  test('toNumber converts various inputs', () => {
    expect(toNumber(123)).toBe(123);
    expect(toNumber('123')).toBe(123);
    expect(toNumber('Rp 1.000')).toBe(1000);
    expect(toNumber(BigInt(1000))).toBe(1000);
  });
  
  test('roundToPrecision rounds correctly', () => {
    expect(roundToPrecision(1.234567, 2)).toBe(1.23);
    expect(roundToPrecision(1.235, 2)).toBe(1.24);
  });
  
  test('generateAlias creates safe alias names', () => {
    const alias = generateAlias({ symbol: 'Rp', precision: 2 });
    expect(typeof alias).toBe('string');
    expect(alias).toMatch(/^rp_/);
  });
});