/**
 * String utilities for Rupiah Formatter
 */

/**
 * Escape regex special characters
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Normalize Rupiah string (remove extra spaces, standardize format)
 */
export function normalizeRupiahString(
  str: string,
  options: {
    symbol?: string;
    decimalSeparator?: string;
    thousandSeparator?: string;
    spaceBetween?: boolean;
  } = {}
): string {
  const {
    symbol = 'Rp',
    decimalSeparator = ',',
    thousandSeparator = '.',
    spaceBetween = false
  } = options;
  
  let normalized = str.trim();
  
  // Remove multiple spaces
  normalized = normalized.replace(/\s+/g, ' ');
  
  // Ensure proper symbol placement
  if (normalized.includes(symbol)) {
    const symbolIndex = normalized.indexOf(symbol);
    const afterSymbol = normalized.substring(symbolIndex + symbol.length);
    
    // Remove spaces around symbol based on spaceBetween option
    if (spaceBetween) {
      normalized = `${symbol} ${afterSymbol.trim()}`;
    } else {
      normalized = `${symbol}${afterSymbol.trim()}`;
    }
  }
  
  // Ensure thousand separators are consistent
  const thousandRegex = new RegExp(escapeRegex(thousandSeparator), 'g');
  normalized = normalized.replace(thousandRegex, thousandSeparator);
  
  // Ensure decimal separator is consistent
  const decimalRegex = new RegExp(`[.,]`, 'g');
  normalized = normalized.replace(decimalRegex, (match) => {
    return match === decimalSeparator ? decimalSeparator : decimalSeparator;
  });
  
  return normalized;
}

/**
 * Extract number from any string
 */
export function extractNumberFromString(str: string): number {
  if (!str || typeof str !== 'string') return 0;
  
  // Try to find number patterns
  const patterns = [
    // Pattern: Rp 1.234,56
    /Rp\s*([\d.,]+)/,
    // Pattern: 1.234,56
    /^([\d.,]+)$/,
    // Pattern: IDR 1,234.56
    /IDR\s*([\d.,]+)/,
    // Pattern: 1,234.56
    /^([\d.,]+)$/,
    // Any number pattern
    /([\d.,]+)/
  ];
  
  for (const pattern of patterns) {
    const match = str.match(pattern);
    if (match && match[1]) {
      const numberStr = match[1]
        .replace(/\.(?=\d{3})/g, '') // Remove thousand separators
        .replace(',', '.'); // Convert decimal comma to dot
      
      const num = parseFloat(numberStr);
      if (!isNaN(num)) {
        return num;
      }
    }
  }
  
  return 0;
}

/**
 * Validate if string matches Rupiah pattern
 */
export function isRupiahPattern(
  str: string,
  options: {
    symbol?: string;
    decimalSeparator?: string;
    thousandSeparator?: string;
  } = {}
): boolean {
  const {
    symbol = 'Rp',
    decimalSeparator = ',',
    thousandSeparator = '.'
  } = options;
  
  const escapedSymbol = escapeRegex(symbol);
  const escapedDecimal = escapeRegex(decimalSeparator);
  const escapedThousand = escapeRegex(thousandSeparator);
  
  // Pattern: Rp 1.234,56 or 1.234,56 or -Rp 1.234,56
  const pattern = new RegExp(
    `^-?${escapedSymbol}?\\s*\\d{1,3}(?:${escapedThousand}\\d{3})*(?:${escapedDecimal}\\d{2})?$`
  );
  
  return pattern.test(str.trim());
}

/**
 * Split Rupiah string into components
 */
export function splitRupiahString(
  str: string,
  options: {
    symbol?: string;
    decimalSeparator?: string;
    thousandSeparator?: string;
  } = {}
): {
  symbol: string;
  integerPart: string;
  decimalPart: string;
  isNegative: boolean;
} {
  const {
    symbol = 'Rp',
    decimalSeparator = ',',
    thousandSeparator = '.'
  } = options;
  
  let normalized = str.trim();
  let extractedSymbol = '';
  let isNegative = false;
  
  // Check for negative
  if (normalized.startsWith('-')) {
    isNegative = true;
    normalized = normalized.substring(1);
  }
  
  // Extract symbol
  if (normalized.startsWith(symbol)) {
    extractedSymbol = symbol;
    normalized = normalized.substring(symbol.length).trim();
  }
  
  // Split by decimal separator
  const [integerPart, decimalPart = ''] = normalized.split(decimalSeparator);
  
  // Remove thousand separators from integer part
  const cleanInteger = integerPart.replace(new RegExp(escapeRegex(thousandSeparator), 'g'), '');
  
  return {
    symbol: extractedSymbol,
    integerPart: cleanInteger,
    decimalPart,
    isNegative
  };
}

/**
 * Format string with proper capitalization
 */
export function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncate string with ellipsis
 */
export function truncateString(str: string, maxLength: number, ellipsis: string = '...'): string {
  if (str.length <= maxLength) return str;
  
  return str.substring(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Remove all non-numeric characters from string
 */
export function keepOnlyNumbers(str: string): string {
  return str.replace(/[^\d]/g, '');
}

/**
 * Format phone number string
 */
export function formatPhoneNumber(str: string): string {
  const numbers = keepOnlyNumbers(str);
  
  if (numbers.length <= 4) {
    return numbers;
  } else if (numbers.length <= 8) {
    return `${numbers.substring(0, 4)}-${numbers.substring(4)}`;
  } else {
    return `${numbers.substring(0, 4)}-${numbers.substring(4, 8)}-${numbers.substring(8, 12)}`;
  }
}

export default {
  escapeRegex,
  normalizeRupiahString,
  extractNumberFromString,
  isRupiahPattern,
  splitRupiahString,
  capitalizeWords,
  truncateString,
  keepOnlyNumbers,
  formatPhoneNumber
};