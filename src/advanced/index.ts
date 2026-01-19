/**
 * Advanced API for Rupiah Formatter
 * Complete formatter with all features
 */

import { CoreFormatter } from '../core/formatter';
import { Plugin } from '../core/types';
import { PRESETS } from '../presets';
import { CachePlugin, CompactPlugin, WordsPlugin, ReactPlugin } from '../plugins';

export class AdvancedRupiahFormatter extends CoreFormatter {
  private static DEFAULT_PLUGINS = [] as const; // Removed 'cache' and 'compact'
  private installedPlugins: Set<string> = new Set();
  
  constructor(
    options?: any,
    plugins?: Array<string | Plugin>
  ) {
    super(options);
    
    // Hanya install default plugins jika plugins adalah undefined
    // Jika plugins adalah array (kosong atau tidak), jangan install default
    if (plugins === undefined) {
      this.installDefaultPlugins();
    } else if (plugins && plugins.length > 0) {
      this.installPlugins(plugins);
    }
    // Jika plugins adalah array kosong, tidak install apa-apa
  }
  
  private installDefaultPlugins(): void {
    // No default plugins installed
    // This prevents plugin conflicts during testing
  }
  
  private installPlugins(plugins: Array<string | Plugin>): void {
    for (const plugin of plugins) {
      if (typeof plugin === 'string') {
        this.installNamedPlugin(plugin);
      } else {
        if (!this.installedPlugins.has(plugin.name)) {
          this.use(plugin);
          this.installedPlugins.add(plugin.name);
        }
      }
    }
  }
  
  private installNamedPlugin(pluginName: string): void {
    if (this.installedPlugins.has(pluginName)) return;
    
    switch (pluginName.toLowerCase()) {
      case 'cache':
        this.use(new CachePlugin());
        this.installedPlugins.add('cache');
        break;
      case 'compact':
        this.use(new CompactPlugin());
        this.installedPlugins.add('compact');
        break;
      case 'words':
        this.use(new WordsPlugin());
        this.installedPlugins.add('words');
        break;
      case 'react':
        this.use(new ReactPlugin());
        this.installedPlugins.add('react');
        break;
      default:
        console.warn(`Unknown plugin: ${pluginName}`);
    }
  }
  
  // Enhanced formatting methods
  
  formatWithContext(
    value: any,
    context: 'ecommerce' | 'financial' | 'mobile' | 'accounting' | 'crypto'
  ): string {
    const preset = PRESETS[context.toUpperCase() as keyof typeof PRESETS] || PRESETS.BI_STANDARD;
    const originalOptions = this.getOptions();
    
    try {
      const tempOptions = { ...originalOptions, ...preset };
      this.setOptions(tempOptions);
      
      const result = this.format(value);
      return result;
    } finally {
      // Always restore original options
      this.setOptions(originalOptions);
    }
  }
  
  formatRange(
    min: any,
    max: any,
    separator: string = ' - ',
    options?: {
      formatEach?: boolean;
      sharedOptions?: boolean;
    }
  ): string {
    const { formatEach = true, sharedOptions = true } = options || {};
    
    if (sharedOptions) {
      return `${this.format(min)}${separator}${this.format(max)}`;
    }
    
    if (formatEach) {
      const minFormatted = this.format(min);
      const maxFormatted = this.format(max);
      return `${minFormatted}${separator}${maxFormatted}`;
    }
    
    const minNum = typeof min === 'number' ? min : this.parse(String(min));
    const maxNum = typeof max === 'number' ? max : this.parse(String(max));
    
    return `${minNum}${separator}${maxNum}`;
  }
  
  formatList(
    values: any[],
    options?: {
      separator?: string;
      conjunction?: string;
      formatEach?: boolean;
    }
  ): string {
    const {
      separator = ', ',
      conjunction = ' dan ',
      formatEach = true
    } = options || {};
    
    if (values.length === 0) return '';
    if (values.length === 1) return formatEach ? this.format(values[0]) : String(values[0]);
    
    const formatted = values.map(v => formatEach ? this.format(v) : String(v));
    
    if (formatted.length === 2) {
      return formatted.join(conjunction);
    }
    
    const last = formatted.pop();
    return `${formatted.join(separator)}${conjunction}${last}`;
  }
  
  // Batch operations
  
  batchFormat(
    values: any[],
    options?: {
      chunkSize?: number;
      parallel?: boolean;
      progress?: (percent: number) => void;
    }
  ): string[] {
    const { chunkSize = 1000, parallel = false, progress } = options || {};
    
    const results: string[] = new Array(values.length);
    
    if (!parallel || typeof Worker === 'undefined') {
      // Sequential processing
      for (let i = 0; i < values.length; i++) {
        results[i] = this.format(values[i]);
        
        if (progress && i % 100 === 0) {
          progress((i / values.length) * 100);
        }
      }
    } else {
      // Parallel processing (browser only)
      // Note: This is a simplified version
      const chunkCount = Math.ceil(values.length / chunkSize);
      
      for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, values.length);
        const chunk = values.slice(start, end);
        
        for (let i = 0; i < chunk.length; i++) {
          results[start + i] = this.format(chunk[i]);
        }
        
        if (progress) {
          progress((chunkIndex / chunkCount) * 100);
        }
      }
    }
    
    if (progress) {
      progress(100);
    }
    
    return results;
  }
  
  // Analysis methods
  
  analyze(value: any): {
    original: any;
    parsed: number;
    formatted: string;
    isValid: boolean;
    isInteger: boolean;
    isNegative: boolean;
    isZero: boolean;
    decimalPlaces: number;
    magnitude: string;
    words?: string;
  } {
    // Gunakan try-catch untuk handle semua error
    try {
      const parsed = typeof value === 'number' ? value : this.parse(String(value));
      const formatted = this.format(value);
      const validation = this.validate(value);
      
      const absValue = Math.abs(parsed);
      let magnitude = 'unit';
      
      if (absValue >= 1e12) magnitude = 'trillion';
      else if (absValue >= 1e9) magnitude = 'billion';
      else if (absValue >= 1e6) magnitude = 'million';
      else if (absValue >= 1e3) magnitude = 'thousand';
      
      const result: any = {
        original: value,
        parsed,
        formatted,
        isValid: validation.isValid,
        isInteger: Number.isInteger(parsed),
        isNegative: parsed < 0,
        isZero: parsed === 0,
        decimalPlaces: parsed.toString().includes('.') 
          ? parsed.toString().split('.')[1].length 
          : 0,
        magnitude
      };
      
      // Add words if words plugin is installed
      try {
        // Access through proper channels if available
        if (typeof (this as any).formatWords === 'function') {
          result.words = (this as any).formatWords(value);
        }
      } catch (error) {
        // Silently fail for words
        console.debug('Words plugin not available:', error);
      }
      
      return result;
    } catch (error) {
      console.error('Analysis failed:', error);
      return {
        original: value,
        parsed: 0,
        formatted: this.getOptions().fallback || 'Rp0',
        isValid: false,
        isInteger: false,
        isNegative: false,
        isZero: true,
        decimalPlaces: 0,
        magnitude: 'unit'
      };
    }
  }
  
  // Static methods
  
  static get presets() {
    return PRESETS;
  }
  
  static createFormatter(
    preset?: keyof typeof PRESETS,
    plugins?: Array<string | Plugin>
  ): AdvancedRupiahFormatter {
    const options = preset ? PRESETS[preset] : undefined;
    return new AdvancedRupiahFormatter(options, plugins);
  }
  
  static benchmark(
    values: any[],
    formatters: Array<{
      name: string;
      formatter: AdvancedRupiahFormatter;
    }>
  ): Array<{
    name: string;
    totalTime: number;
    averageTime: number;
    operationsPerSecond: number;
  }> {
    const results: any[] = [];
    
    for (const { name, formatter } of formatters) {
      const start = performance.now();
      
      for (const value of values) {
        formatter.format(value);
      }
      
      const totalTime = performance.now() - start;
      const averageTime = totalTime / values.length;
      const operationsPerSecond = 1000 / averageTime;
      
      results.push({
        name,
        totalTime,
        averageTime,
        operationsPerSecond
      });
    }
    
    return results;
  }
}