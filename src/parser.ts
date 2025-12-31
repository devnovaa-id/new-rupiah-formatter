// src/parser.ts - HANYA YANG PERLU
export function parseRupiah(input: string): number {
  if (!input) return 0;
  
  // Simple, robust parsing
  const cleaned = input
    .replace(/[^\d.,-]/g, '')
    .replace(/\.(?=\d{3})/g, '') // Remove thousand separators
    .replace(',', '.');
  
  return parseFloat(cleaned) || 0;
}

export function isValidRupiah(input: string): boolean {
  return /^-?Rp?\d{1,3}(\.\d{3})*(,\d{2})?$/.test(input.trim());
}