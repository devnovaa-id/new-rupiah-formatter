export class RupiahSanitizer {
  static sanitizeInput(input: unknown): string {
    if (input == null) return '0';
    
    if (typeof input === 'number') {
      return input.toString();
    }
    
    if (typeof input === 'string') {
      return input.trim();
    }
    
    if (typeof input === 'bigint') {
      return input.toString();
    }
    
    return String(input);
  }
  
  static removeFormatting(formattedString: string): string {
    // Remove common currency formatting
    return formattedString
      .replace(/[^\d.,-]/g, '')  // Remove non-numeric except .,-
      .replace(/\./g, '')        // Remove thousand separators
      .replace(',', '.');        // Convert decimal comma to dot
  }
  
  static normalizeDecimal(input: string, decimalSeparator: string = ','): string {
    if (decimalSeparator === ',') {
      return input.replace('.', '').replace(',', '.');
    }
    return input.replace(',', '').replace('.', decimalSeparator);
  }
  
  static escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}