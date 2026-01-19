/**
 * React Plugin for Rupiah Formatter
 * Provides React hooks and components for Rupiah formatting
 */

import { Plugin, InputValue, FormatOptions } from '../core/types';

export interface ReactPluginOptions {
  useMemo?: boolean;
  useCallback?: boolean;
  suspense?: boolean;
}

export class ReactPlugin implements Plugin {
  name = 'react';
  version = '1.0.0';
  
  private options: Required<ReactPluginOptions>;
  
  constructor(options: ReactPluginOptions = {}) {
    this.options = {
      useMemo: true,
      useCallback: true,
      suspense: false,
      ...options
    };
  }
  
  install(formatter: any, options?: ReactPluginOptions): void {
    if (options) {
      this.options = { ...this.options, ...options };
    }
    
    // Check if React is available
    if (typeof window !== 'undefined' && !(window as any).React) {
      console.warn('React is not available. ReactPlugin will not work.');
      return;
    }
    
    // Add React-specific methods
    formatter.useReact = true;
    
    // Add hooks factory method
    formatter.createHooks = (hookOptions?: FormatOptions) => {
      return this.createHooks(formatter, hookOptions);
    };
    
    // Add components factory method
    formatter.createComponents = (componentOptions?: FormatOptions) => {
      return this.createComponents(formatter, componentOptions);
    };
  }
  
  uninstall(): void {
    // Nothing to clean up
  }
  
  beforeFormat(_value: InputValue, _options: FormatOptions): InputValue | void {
    return;
  }
  
  afterFormat(_result: any): any {
    return;
  }
  
  private createHooks(_formatter: any, _options?: FormatOptions) {
    // This method creates React hooks
    // In a real implementation, this would return actual React hooks
    return {
      useRupiah: () => {
        console.warn('React hooks are not available in the current environment');
        return {
          format: (value: InputValue) => _formatter.format(value),
          parse: (formattedString: string) => _formatter.parse(formattedString),
          validate: (value: InputValue) => _formatter.validate(value)
        };
      }
    };
  }
  
  private createComponents(_formatter: any, _options?: FormatOptions) {
    // This method creates React components
    // In a real implementation, this would return actual React components
    return {
      RupiahText: () => {
        console.warn('React components are not available in the current environment');
        return null;
      },
      RupiahInput: () => {
        console.warn('React components are not available in the current environment');
        return null;
      }
    };
  }
}

// Helper function to create React hooks (for manual usage)
export function createRupiahHooks(formatter: any, options?: FormatOptions) {
  const plugin = new ReactPlugin();
  // @ts-ignore - Access private method
  return plugin.createHooks(formatter, options);
}

// Helper function to create React components (for manual usage)
export function createRupiahComponents(formatter: any, options?: FormatOptions) {
  const plugin = new ReactPlugin();
  // @ts-ignore - Access private method
  return plugin.createComponents(formatter, options);
}