/**
 * Number utilities for Rupiah Formatter
 */

/**
 * Safely convert any value to number
 */
export function toNumber(value: any): number {
  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) return 0;
    return value;
  }
  
  if (typeof value === 'string') {
    // Remove all non-numeric characters except minus, dot, and comma
    let cleaned = value.trim()
      .replace(/[^\d.,-]/g, '')
      .replace(/\.(?=\d{3})/g, '') // Remove thousand separators (dots)
      .replace(',', '.'); // Convert comma to dot for decimal
    
    // Handle multiple minus signs
    const isNegative = cleaned.startsWith('-');
    if (isNegative) {
      cleaned = cleaned.replace(/-/g, '');
    }
    
    const num = parseFloat(cleaned);
    if (isNaN(num) || !isFinite(num)) return 0;
    
    return isNegative ? -num : num;
  }
  
  if (typeof value === 'bigint') {
    return Number(value);
  }
  
  if (value === null || value === undefined) {
    return 0;
  }
  
  // Try to convert to number
  const num = Number(value);
  return isNaN(num) || !isFinite(num) ? 0 : num;
}

/**
 * Round a number with specified precision and method
 */
export function roundNumber(
  num: number,
  precision: number = 2,
  method: 'half-up' | 'half-down' | 'floor' | 'ceil' | 'trunc' = 'half-up'
): number {
  if (precision < 0 || precision > 20) {
    throw new Error('Precision must be between 0 and 20');
  }
  
  if (num === 0) return 0;
  
  const factor = Math.pow(10, precision);
  const scaled = num * factor;
  
  switch (method) {
    case 'half-up':
      return Math.round(scaled) / factor;
    case 'half-down':
      const rounded = Math.round(scaled);
      return (Math.abs(scaled % 1) === 0.5 && rounded > scaled)
        ? (rounded - 1) / factor
        : rounded / factor;
    case 'floor':
      return Math.floor(scaled) / factor;
    case 'ceil':
      return Math.ceil(scaled) / factor;
    case 'trunc':
      return Math.trunc(scaled) / factor;
    default:
      return Math.round(scaled) / factor;
  }
}

/**
 * Check if a number is within safe integer range
 */
export function isSafeNumber(num: number): boolean {
  return num >= Number.MIN_SAFE_INTEGER && 
         num <= Number.MAX_SAFE_INTEGER &&
         !isNaN(num) && 
         isFinite(num);
}

/**
 * Format number with separators
 */
export function formatWithSeparators(
  num: number,
  decimalSeparator: string = ',',
  thousandSeparator: string = '.',
  precision: number = 2,
  stripTrailingZero: boolean = false,
  useGrouping: boolean = true
): string {
  if (!isFinite(num)) return '0';
  
  const absNum = Math.abs(num);
  const rounded = roundNumber(absNum, precision, 'half-up');
  
  // Split into integer and decimal parts
  const [integerPart, decimalPart = ''] = rounded.toFixed(precision).split('.');
  
  // Format integer part with thousand separators
  let formattedInteger = integerPart;
  if (useGrouping) {
    formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  }
  
  // Handle decimal part
  let formattedDecimal = '';
  if (precision > 0 && decimalPart) {
    let decimalDigits = decimalPart;
    
    // Remove trailing zeros if requested
    if (stripTrailingZero) {
      decimalDigits = decimalDigits.replace(/0+$/, '');
    }
    
    if (decimalDigits.length > 0) {
      formattedDecimal = decimalSeparator + decimalDigits;
    }
  }
  
  return formattedInteger + formattedDecimal;
}

/**
 * Calculate percentage of a number
 */
export function calculatePercentage(
  value: number,
  percentage: number,
  precision: number = 2
): number {
  const result = (value * percentage) / 100;
  return roundNumber(result, precision);
}

/**
 * Get the number of decimal places in a number
 */
export function getDecimalPlaces(num: number): number {
  if (!isFinite(num)) return 0;
  if (Math.floor(num) === num) return 0;
  
  const str = num.toString();
  if (str.includes('e-')) {
    return parseInt(str.split('e-')[1], 10);
  }
  
  if (str.includes('.')) {
    return str.split('.')[1].length;
  }
  
  return 0;
}

/**
 * Compare two numbers with tolerance for floating point errors
 */
export function numbersEqual(a: number, b: number, tolerance: number = 0.000001): boolean {
  return Math.abs(a - b) < tolerance;
}

/**
 * Clamp a number between min and max
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Generate a random number in range
 */
export function randomInRange(min: number, max: number, precision: number = 0): number {
  const random = Math.random() * (max - min) + min;
  return roundNumber(random, precision);
}