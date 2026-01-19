/**
 * Cache Plugin for Rupiah Formatter
 * Memoizes formatting results for better performance
 */

import { Plugin, InputValue, FormatOptions, FormatResult } from '../core/types';

export interface CachePluginOptions {
  maxSize?: number;
  ttl?: number; // Time to live in milliseconds
  strategy?: 'fifo' | 'lru' | 'lfu';
}

interface CacheEntry {
  value: string;
  timestamp: number;
  hitCount: number;
}

export class CachePlugin implements Plugin {
  name = 'cache';
  version = '1.0.0';
  
  private cache: Map<string, CacheEntry> = new Map();
  private options: Required<CachePluginOptions>;
  private originalFormat?: (value: InputValue) => string;
  
  constructor(options: CachePluginOptions = {}) {
    this.options = {
      maxSize: 1000,
      ttl: 0, // 0 = no expiration
      strategy: 'lru',
      ...options
    };
  }
  
  install(formatter: any, options?: CachePluginOptions): void {
    if (options) {
      this.options = { ...this.options, ...options };
    }
    
    // Store original format method
    this.originalFormat = formatter.format.bind(formatter);
    
    // Override format method with caching
    formatter.format = (value: InputValue): string => {
      try {
        const cacheKey = this.generateCacheKey(value, formatter.getOptions());
        
        // Check cache
        const cached = this.cache.get(cacheKey);
        if (cached) {
          // Check TTL
          if (this.options.ttl > 0 && 
              Date.now() - cached.timestamp > this.options.ttl) {
            this.cache.delete(cacheKey);
          } else {
            // Update hit count and timestamp for LRU/LFU
            cached.hitCount++;
            cached.timestamp = Date.now();
            return cached.value || (formatter.getOptions().fallback || 'Rp0');
          }
        }
        
        // Call original format
        const result = this.originalFormat!(value);
        
        // Store in cache
        this.setCache(cacheKey, result);
        
        return result;
      } catch (error) {
        // Fallback to original format if cache fails
        console.error('Cache plugin error:', error);
        return this.originalFormat!(value) || 'Rp0';
      }
    };
    
    // Add cache management methods
    formatter.cacheStats = () => this.getStats();
    formatter.clearCache = () => this.clear();
    formatter.getCacheSize = () => this.cache.size;
    formatter.setCacheOptions = (options: CachePluginOptions) => {
      this.options = { ...this.options, ...options };
    };
  }
  
  uninstall(): void {
    this.clear();
  }
  
  beforeFormat(_value: InputValue, _options: FormatOptions): InputValue | void {
    return;
  }
  
  afterFormat(_result: FormatResult): FormatResult | void {
    return;
  }
  
  private generateCacheKey(value: InputValue, options: FormatOptions): string {
    const valueStr = String(value);
    const optionsStr = JSON.stringify(options);
    return `${valueStr}::${optionsStr}`;
  }
  
  private setCache(key: string, value: string): void {
    // Check size limit
    if (this.cache.size >= this.options.maxSize) {
      this.evictEntry();
    }
    
    const entry: CacheEntry = {
      value,
      timestamp: Date.now(),
      hitCount: 1
    };
    
    this.cache.set(key, entry);
  }
  
  private evictEntry(): void {
    if (this.cache.size === 0) return;
    
    let keyToEvict: string | null = null;
    
    switch (this.options.strategy) {
      case 'fifo':
        // First in, first out
        const firstKey = this.cache.keys().next().value;
        keyToEvict = firstKey || null;
        break;
        
      case 'lru':
        // Least recently used
        let oldestTimestamp = Date.now();
        let oldestKey: string | null = null;
        
        for (const [key, entry] of this.cache.entries()) {
          if (entry.timestamp < oldestTimestamp) {
            oldestTimestamp = entry.timestamp;
            oldestKey = key;
          }
        }
        
        keyToEvict = oldestKey;
        break;
        
      case 'lfu':
        // Least frequently used
        let leastHits = Infinity;
        let leastKey: string | null = null;
        
        for (const [key, entry] of this.cache.entries()) {
          if (entry.hitCount < leastHits) {
            leastHits = entry.hitCount;
            leastKey = key;
          }
        }
        
        keyToEvict = leastKey;
        break;
    }
    
    if (keyToEvict) {
      this.cache.delete(keyToEvict);
    }
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  getStats(): {
    size: number;
    hitRate: number;
    hits: number;
    misses: number;
    maxSize: number;
    strategy: string;
  } {
    const entries = Array.from(this.cache.values());
    const hits = entries.reduce((sum, entry) => sum + entry.hitCount, 0);
    const misses = this.cache.size;
    
    return {
      size: this.cache.size,
      hitRate: hits / (hits + misses) || 0,
      hits,
      misses,
      maxSize: this.options.maxSize,
      strategy: this.options.strategy
    };
  }
}