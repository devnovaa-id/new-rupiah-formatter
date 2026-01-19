/**
 * Utility functions for Rupiah Formatter
 */

export * from './number-utils';
export * from './string-utils';

/**
 * Performance measurement utilities
 */
export class Performance {
  static measure<T>(fn: () => T, iterations: number = 1000): {
    result: T;
    averageTime: number;
    totalTime: number;
    operationsPerSecond: number;
  } {
    const start = performance.now();
    let result: T;
    
    for (let i = 0; i < iterations; i++) {
      result = fn();
    }
    
    const totalTime = performance.now() - start;
    const averageTime = totalTime / iterations;
    const operationsPerSecond = 1000 / averageTime;
    
    return {
      result: result!,
      averageTime,
      totalTime,
      operationsPerSecond
    };
  }
  
  static benchmark(
    functions: Array<{ name: string; fn: () => any }>,
    iterations: number = 1000
  ): Array<{
    name: string;
    averageTime: number;
    operationsPerSecond: number;
    relativeSpeed: number;
  }> {
    const results = functions.map(({ name, fn }) => {
      const measurement = this.measure(fn, iterations);
      return {
        name,
        averageTime: measurement.averageTime,
        operationsPerSecond: measurement.operationsPerSecond
      };
    });
    
    const fastest = Math.min(...results.map(r => r.averageTime));
    
    return results.map(result => ({
      ...result,
      relativeSpeed: fastest / result.averageTime
    }));
  }
}

/**
 * Memory usage utilities
 */
export class Memory {
  static getUsage(): NodeJS.MemoryUsage {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage();
    }
    
    // Browser fallback
    if (typeof window !== 'undefined' && (window as any).performance?.memory) {
      return (window as any).performance.memory;
    }
    
    return {
      rss: 0,
      heapTotal: 0,
      heapUsed: 0,
      external: 0,
      arrayBuffers: 0
    };
  }
  
  static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

/**
 * Error handling utilities
 */
export class ErrorHandler {
  static createError(code: string, message: string, details?: any): Error {
    const error = new Error(message) as any;
    error.code = code;
    error.details = details;
    error.timestamp = new Date().toISOString();
    return error;
  }
  
  static isRupiahError(error: any): boolean {
    return error && error.code && error.timestamp;
  }
  
  static formatError(error: any): string {
    if (this.isRupiahError(error)) {
      return `[${error.code}] ${error.message}`;
    }
    
    return error?.message || String(error);
  }
}