/**
 * Plugin System for Rupiah Formatter
 */

import { Plugin } from '../core/types';

// Export plugin interface
export type { Plugin };

// Export built-in plugins
export { CachePlugin } from './cache';
export { CompactPlugin } from './compact';
export { WordsPlugin } from './words';
export { ReactPlugin } from './react';

// Re-export types
export type { CachePluginOptions } from './cache';
export type { CompactPluginOptions } from './compact';
export type { WordsPluginOptions } from './words';
export type { ReactPluginOptions } from './react';

/**
 * Plugin Manager for easy plugin management
 */
export class PluginManager {
  private static registeredPlugins: Map<string, Plugin> = new Map();
  
  static register(plugin: Plugin): void {
    if (this.registeredPlugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" is already registered`);
      return;
    }
    
    this.registeredPlugins.set(plugin.name, plugin);
  }
  
  static get(name: string): Plugin | undefined {
    return this.registeredPlugins.get(name);
  }
  
  static getAll(): Plugin[] {
    return Array.from(this.registeredPlugins.values());
  }
  
  static unregister(name: string): boolean {
    return this.registeredPlugins.delete(name);
  }
  
  static clear(): void {
    this.registeredPlugins.clear();
  }
}