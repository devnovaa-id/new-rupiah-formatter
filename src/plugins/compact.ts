/**
 * Compact Plugin for Rupiah Formatter
 * Formats large numbers in compact form (1K, 1M, 1B, etc.)
 */

import { Plugin, InputValue, FormatOptions, FormatResult } from '../core/types';

export interface CompactPluginOptions {
  threshold?: number;
  precision?: number;
  units?: {
    thousand?: string;
    million?: string;
    billion?: string;
    trillion?: string;
  };
  autoDetect?: boolean;
}

export class CompactPlugin implements Plugin {
  name = 'compact';
  version = '1.0.0';
  
  private options: Required<CompactPluginOptions>;
  
  constructor(options: CompactPluginOptions = {}) {
    this.options = {
      threshold: 1000,
      precision: 1,
      units: {
        thousand: 'RB',
        million: 'JT',
        billion: 'M',
        trillion: 'T'
      },
      autoDetect: false,
      ...options
    };
  }
  
  install(formatter: any, options?: CompactPluginOptions): void {
    if (options) {
      this.options = { ...this.options, ...options };
    }
    
    // Store original format method
    const originalFormat = formatter.format.bind(formatter);
    
    // Override format method with compact support
    formatter.format = (value: InputValue): string => {
      try {
        const currentOptions = formatter.getOptions();
        const num = typeof value === 'number' ? value : parseFloat(String(value));
        
        // Check if compact should be applied
        if (this.shouldApplyCompact(num, currentOptions)) {
          // Apply compact formatting
          return this.formatCompact(value, currentOptions);
        }
        
        // Use original format
        return originalFormat(value);
        
      } catch (error) {
        // Fallback to original format
        return formatter.getOptions().fallback || 'Rp0';
      }
    };
    
    // Add compact formatting method
    formatter.formatCompact = (value: InputValue): string => {
      return this.formatCompact(value, formatter.getOptions());
    };
    
    // Add method to get compact units
    formatter.getCompactUnits = () => ({ ...this.options.units });
  }
  
  uninstall(): void {
    // Nothing to clean up
  }
  
  beforeFormat(_value: InputValue, _options: FormatOptions): InputValue | void {
    return;
  }
  
  afterFormat(_result: FormatResult): FormatResult | void {
    return;
  }
  
  private shouldApplyCompact(num: number, options: FormatOptions): boolean {
    if (isNaN(num) || !isFinite(num)) {
      return false;
    }
    
    // If compact is explicitly enabled in options
    if (options.compact) {
      return Math.abs(num) >= (options.compactThreshold || this.options.threshold);
    }
    
    // If autoDetect is enabled
    if (this.options.autoDetect) {
      return Math.abs(num) >= this.options.threshold;
    }
    
    return false;
  }
  
  private formatCompact(value: InputValue, options: FormatOptions): string {
    try {
      const num = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
      const absNum = Math.abs(num);
      const isNegative = num < 0;
      
      // Determine unit
      let unit = '';
      let divisor = 1;
      
      if (absNum >= 1e12) {
        unit = this.options.units.trillion || 'T';
        divisor = 1e12;
      } else if (absNum >= 1e9) {
        unit = this.options.units.billion || 'B';
        divisor = 1e9;
      } else if (absNum >= 1e6) {
        unit = this.options.units.million || 'JT';
        divisor = 1e6;
      } else if (absNum >= 1e3) {
        unit = this.options.units.thousand || 'RB';
        divisor = 1e3;
      }
      
      if (divisor === 1) {
        // No compact formatting needed - use original formatter
        const formatter = new (require('../core/formatter').CoreFormatter)(options);
        return formatter.format(value);
      }
      
      // Calculate compact value
      const compactValue = absNum / divisor;
      
      // Format with specified precision
      const precision = options.compactPrecision || this.options.precision;
      let formatted = compactValue.toFixed(precision);
      
      // PERBAIKAN DI SINI: Ganti titik dengan pemisah desimal yang benar
      if (options.decimalSeparator && options.decimalSeparator !== '.') {
        formatted = formatted.replace('.', options.decimalSeparator);
      }
      
      // Remove trailing zeros if enabled
      if (options.stripTrailingZero) {
        // Perhatikan bahwa kita perlu menghapus trailing zeros setelah mengganti separator
        const separator = options.decimalSeparator || '.';
        if (formatted.includes(separator)) {
          const parts = formatted.split(separator);
          if (parts.length === 2) {
            let decimalPart = parts[1].replace(/0+$/, '');
            if (decimalPart.length === 0) {
              formatted = parts[0];
            } else {
              formatted = parts[0] + separator + decimalPart;
            }
          }
        }
      }
      
      // Add unit
      formatted += unit;
      
      // Add sign
      if (isNegative) {
        formatted = `-${formatted}`;
      }
      
      // Apply symbol formatting
      if (options.symbol) {
        const space = options.spaceBetween ? ' ' : '';
        if (options.symbolPosition === 'before') {
          formatted = options.symbol + space + formatted;
        } else {
          formatted = formatted + space + options.symbol;
        }
      }
      
      return formatted;
      
    } catch (error) {
      console.error('Compact formatting error:', error);
      return options.fallback || 'Rp0';
    }
  }
}