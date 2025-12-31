

---

//jest.config.js

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ]
};

---

//package.json

{
  "name": "@devnovaa-id/new-rupiah-formatter",
  "version": "2.0.0",
  "description": "Simple, accurate Rupiah formatter following BI standards",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "npm run clean && npm run build:cjs && npm run build:esm",
    "build:cjs": "tsc -p tsconfig.json --module commonjs --outDir dist",
    "build:esm": "tsc -p tsconfig.json --module esnext --outDir dist/esm && mv dist/esm/index.js dist/index.esm.js && rm -rf dist/esm",
    "clean": "rm -rf dist coverage",
    "test": "jest",
    "test:watch": "jest --watch",
    "type-check": "tsc --noEmit",
    "prepublishOnly": "npm run type-check && npm run test && npm run build"
  },
  "keywords": [
    "rupiah",
    "currency",
    "indonesia",
    "formatter",
    "simple",
    "bi-standar"
  ],
  "author": "this key <this.key@devnova.icu>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/devnovaa-id/new-rupiah-formatter.git"
  },
  "bugs": {
    "url": "https://github.com/devnovaa-id/new-rupiah-formatter/issues"
  },
  "homepage": "https://newrupiahformatter.devnova.icu",
  "devDependencies": {
    "@types/jest": "^29.5.14",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.2",
    "typescript": "^5.3.2"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}

---

//src/constants.ts

// src/constants.ts
export const BI_STANDARD = {
  symbol: 'Rp',
  decimalSeparator: ',',
  thousandSeparator: '.',
  symbolPosition: 'before' as const,
  spaceBetween: false,
  precision: 2,
  stripTrailingZero: false,
  negativeFormat: 'sign' as const,
  fallback: 'Rp0'
} as const;

export const FORMAT_PRESETS = {
  STANDARD: BI_STANDARD,
  NO_DECIMAL: { ...BI_STANDARD, precision: 0, stripTrailingZero: true },
  COMPACT: { ...BI_STANDARD, precision: 0, stripTrailingZero: true },
  ACCOUNTING: { ...BI_STANDARD, negativeFormat: 'parentheses' as const }
} as const;

---

//src/formatter.ts

// src/formatter.ts - SANGAT SEDERHANA

export class RupiahFormatter {
  private options: Required<FormatOptions>;

  constructor(options: FormatOptions = {}) {
    this.options = { ...BI_STANDARD, ...options };
    this.validateOptions();
  }

  private validateOptions(): void {
    if (this.options.decimalSeparator === this.options.thousandSeparator) {
      throw new Error('Decimal and thousand separators cannot be the same');
    }
    if (this.options.precision < 0 || this.options.precision > 20) {
      throw new Error('Precision must be between 0 and 20');
    }
  }

  private cleanNumber(num: number): number {
    if (!isFinite(num)) return 0;
    if (Math.abs(num) < Number.EPSILON) return 0;
    return num;
  }

  private formatNumber(num: number): string {
    const { decimalSeparator, thousandSeparator, precision } = this.options;
    const absNum = Math.abs(num);
    
    // Handle zero
    if (absNum === 0) {
      return precision > 0 ? `0${decimalSeparator}${'0'.repeat(precision)}` : '0';
    }

    // Format with fixed precision
    let [integer, decimal] = absNum.toFixed(precision).split('.');
    
    // Add thousand separators
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    
    if (precision === 0 || !decimal) {
      return integer;
    }
    
    return `${integer}${decimalSeparator}${decimal}`;
  }

  format(value: InputValue): string {
    try {
      // Convert input to number
      let num = typeof value === 'string' ? this.parse(value) : Number(value);
      num = this.cleanNumber(num);
      
      if (num === 0) return this.options.fallback;

      const { symbol, symbolPosition, spaceBetween, negativeFormat } = this.options;
      const isNegative = num < 0;
      const formattedNumber = this.formatNumber(num);
      
      // Build result based on options
      let result = formattedNumber;
      const space = spaceBetween ? ' ' : '';

      if (isNegative) {
        if (negativeFormat === 'parentheses') {
          result = symbolPosition === 'before'
            ? `${symbol}${space}(${formattedNumber})`
            : `(${formattedNumber})${space}${symbol}`;
        } else {
          const prefix = symbolPosition === 'before' ? `-${symbol}${space}` : '-';
          result = symbolPosition === 'before'
            ? `${prefix}${formattedNumber}`
            : `${prefix}${formattedNumber}${space}${symbol}`;
        }
      } else {
        result = symbolPosition === 'before'
          ? `${symbol}${space}${formattedNumber}`
          : `${formattedNumber}${space}${symbol}`;
      }

      return result;
    } catch (error) {
      console.warn('Format error:', error);
      return this.options.fallback;
    }
  }

  parse(formattedString: string): number {
    if (!formattedString || typeof formattedString !== 'string') return 0;
    
    // Remove symbol and spaces
    let cleaned = formattedString
      .replace(/[^\d.,-]/g, '')
      .replace(/\./g, '') // Remove thousand separators
      .replace(',', '.'); // Convert decimal comma to dot
    
    // Handle negative numbers
    const isNegative = cleaned.startsWith('-');
    if (isNegative) cleaned = cleaned.substring(1);
    
    const num = parseFloat(cleaned) || 0;
    return isNegative ? -num : num;
  }

  // SIMPLE utility methods only
  formatRange(min: InputValue, max: InputValue, separator: string = ' - '): string {
    return `${this.format(min)}${separator}${this.format(max)}`;
  }

  static format(value: InputValue, options?: FormatOptions): string {
    return new RupiahFormatter(options).format(value);
  }

  static parse(formattedString: string): number {
    return new RupiahFormatter().parse(formattedString);
  }
}

---

//src/index.ts

// src/index.ts - SINGLE EXPORT
import { RupiahFormatter } from './formatter';
import { parseRupiah, isValidRupiah } from './parser';
import { BI_STANDARD, FORMAT_PRESETS } from './constants';
import type { FormatOptions, InputValue } from './types';

// Main function - DEAD SIMPLE
export function formatRupiah(
  value: InputValue,
  options?: FormatOptions
): string {
  return RupiahFormatter.format(value, options);
}

// Named exports for flexibility
export { 
  RupiahFormatter,
  parseRupiah,
  isValidRupiah,
  BI_STANDARD,
  FORMAT_PRESETS
};

export type { FormatOptions, InputValue };

// Default export (all-in-one object)
const Rupiah = {
  format: formatRupiah,
  parse: parseRupiah,
  isValid: isValidRupiah,
  Formatter: RupiahFormatter,
  STANDARD: BI_STANDARD,
  PRESETS: FORMAT_PRESETS
};

export default Rupiah;

---

//src/parser.ts

// src/parser.ts - HANYA YANG PERLU
export function parseRupiah(input: string): number {
  if (!input) return 0;
  
  // Simple, robust parsing
  const cleaned = input
    .replace(/[^\d.,-]/g, '')
    .replace(/\.(?=\d{3})/g, '') // Remove thousand separators
    .replace(',', '.');
  
  return parseFloat(cleaned) || 0;
}

export function isValidRupiah(input: string): boolean {
  return /^-?Rp?\d{1,3}(\.\d{3})*(,\d{2})?$/.test(input.trim());
}

---

//src/types.ts

// src/types.ts
export interface FormatOptions {
  symbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  symbolPosition?: 'before' | 'after';
  spaceBetween?: boolean;
  precision?: number;
  stripTrailingZero?: boolean;
  negativeFormat?: 'sign' | 'parentheses';
  fallback?: string;
}

export type InputValue = number | string;

---

//tsconfig.json

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}

---

