/**
 * Words Plugin for Rupiah Formatter
 * Converts numbers to Indonesian words (e.g., "Satu Juta Rupiah")
 */

import { Plugin, InputValue, FormatOptions, FormatResult } from '../core/types';

export interface WordsPluginOptions {
  capitalize?: boolean;
  includeCents?: boolean;
  centsAsWords?: boolean;
  currencyName?: string;
}

export class WordsPlugin implements Plugin {
  name = 'words';
  version = '1.0.0';
  
  private options: Required<WordsPluginOptions>;
  private static readonly UNITS = [
    '', 'ribu', 'juta', 'miliar', 'triliun', 'kuadriliun', 
    'kuintiliun', 'sekstiliun', 'septiliun', 'oktiliun'
  ];
  
  private static readonly NUMBERS = [
    '', 'satu', 'dua', 'tiga', 'empat', 'lima', 
    'enam', 'tujuh', 'delapan', 'sembilan'
  ];
  
  private static readonly TEENS = [
    'sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas',
    'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'
  ];
  
  private static readonly TENS = [
    '', '', 'dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh',
    'enam puluh', 'tujuh puluh', 'delapan puluh', 'sembilan puluh'
  ];
  
  constructor(options: WordsPluginOptions = {}) {
    this.options = {
      capitalize: true,
      includeCents: true,
      centsAsWords: false,
      currencyName: 'rupiah',
      ...options
    };
  }
  
  install(formatter: any, options?: WordsPluginOptions): void {
    if (options) {
      this.options = { ...this.options, ...options };
    }
    
    // Add words formatting method
    formatter.formatWords = (value: InputValue) => {
      return this.formatWords(value);
    };
    
    // Add method to get options
    formatter.getWordsOptions = () => ({ ...this.options });
  }
  
  uninstall(): void {
    // Nothing to clean up
  }
  
  beforeFormat(_value: InputValue, _options: FormatOptions): InputValue | void {
    // Nothing to do before formatting
    return;
  }
  
  afterFormat(_result: FormatResult): FormatResult | void {
    // Nothing to do after formatting
    return;
  }
  
  formatWords(value: InputValue): string {
    const num = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
    
    if (num === 0) {
      return this.finalize('nol');
    }
    
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    
    // Split into integer and decimal parts
    const integerPart = Math.floor(absNum);
    const decimalPart = Math.round((absNum - integerPart) * 100);
    
    // Convert integer part to words
    let words = this.convertInteger(integerPart);
    
    // Add decimal part if needed
    if (this.options.includeCents && decimalPart > 0) {
      if (this.options.centsAsWords) {
        const centsWords = this.convertInteger(decimalPart);
        words += ` koma ${centsWords}`;
      } else {
        words += ` koma ${decimalPart.toString().padStart(2, '0')}`;
      }
    }
    
    // Add currency name
    words += ` ${this.options.currencyName}`;
    
    // Add negative sign
    if (isNegative) {
      words = `minus ${words}`;
    }
    
    // Capitalize if needed
    if (this.options.capitalize) {
      words = words.charAt(0).toUpperCase() + words.slice(1);
    }
    
    return words;
  }
  
  private convertInteger(num: number): string {
    if (num === 0) return '';
    if (num < 10) return WordsPlugin.NUMBERS[num];
    if (num < 20) return WordsPlugin.TEENS[num - 10];
    if (num < 100) {
      const tens = Math.floor(num / 10);
      const units = num % 10;
      return WordsPlugin.TENS[tens] + 
        (units > 0 ? ' ' + WordsPlugin.NUMBERS[units] : '');
    }
    if (num < 1000) {
      const hundreds = Math.floor(num / 100);
      const remainder = num % 100;
      
      let words = '';
      if (hundreds === 1) {
        words = 'seratus';
      } else {
        words = WordsPlugin.NUMBERS[hundreds] + ' ratus';
      }
      
      if (remainder > 0) {
        words += ' ' + this.convertInteger(remainder);
      }
      
      return words;
    }
    
    // Handle thousands and above
    let words = '';
    let unitIndex = 0;
    let tempNum = num;
    
    while (tempNum > 0) {
      const chunk = tempNum % 1000;
      tempNum = Math.floor(tempNum / 1000);
      
      if (chunk > 0) {
        let chunkWords = this.convertInteger(chunk);
        
        // Special case for 1000
        if (unitIndex === 1 && chunk === 1) {
          chunkWords = 'seribu';
        } else if (unitIndex > 0) {
          chunkWords += ' ' + WordsPlugin.UNITS[unitIndex];
        }
        
        words = chunkWords + (words ? ' ' + words : '');
      }
      
      unitIndex++;
    }
    
    return words.trim();
  }
  
  private finalize(words: string): string {
    let result = words;
    
    if (this.options.capitalize) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    
    return result + ` ${this.options.currencyName}`;
  }
}