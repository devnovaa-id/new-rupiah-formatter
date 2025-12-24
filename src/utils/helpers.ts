import { InputValue } from './types';

export const isNumeric = (value: unknown): boolean => {
  if (typeof value === 'number' || typeof value === 'bigint') return true;
  if (typeof value !== 'string') return false;
  
  const cleaned = value
    .replace(/[^\d.,-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  return !isNaN(parseFloat(cleaned)) && isFinite(parseFloat(cleaned));
};

export const toNumber = (value: InputValue): number => {
  if (typeof value === 'number') {
    return isNaN(value) || !isFinite(value) ? 0 : value;
  }
  
  if (typeof value === 'bigint') {
    return Number(value);
  }
  
  if (typeof value === 'string') {
    // Fungsi khusus untuk parsing string Rupiah
    return parseRupiahString(value);
  }
  
  // Try to convert any other type to number
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

// Helper function khusus untuk parsing string Rupiah
function parseRupiahString(value: string): number {
  if (!value || typeof value !== 'string') return 0;
  
  const trimmed = value.trim();
  if (trimmed === '') return 0;
  
  // Handle boolean strings
  if (trimmed.toLowerCase() === 'true') return 1;
  if (trimmed.toLowerCase() === 'false') return 0;
  
  // Hapus semua karakter non-numeric kecuali titik, koma, dan minus
  let cleaned = trimmed.replace(/[^\d.,-]/g, '');
  
  // Jika tidak ada angka, return 0
  if (cleaned === '' || cleaned === '-' || cleaned === '.' || cleaned === ',') {
    return 0;
  }
  
  // Tentukan apakah negatif
  const isNegative = cleaned.startsWith('-');
  if (isNegative) {
    cleaned = cleaned.substring(1);
  }
  
  // Logika parsing untuk format Rupiah
  // Format Indonesia: 1.234.567,89 (titik ribuan, koma desimal)
  // Format Internasional: 1,234,567.89 (koma ribuan, titik desimal)
  
  // Hitung jumlah titik dan koma
  const dotCount = (cleaned.match(/\./g) || []).length;
  const commaCount = (cleaned.match(/,/g) || []).length;
  
  let result: number;
  
  if (dotCount > 0 && commaCount > 0) {
    // Ada kedua-duanya
    const lastDotIndex = cleaned.lastIndexOf('.');
    const lastCommaIndex = cleaned.lastIndexOf(',');
    
    if (lastDotIndex > lastCommaIndex) {
      // Titik adalah pemisah desimal terakhir (format internasional)
      // Contoh: 1,234,567.89
      result = parseFloat(
        cleaned
          .replace(/,/g, '')  // Hapus koma (ribuan)
      );
    } else {
      // Koma adalah pemisah desimal terakhir (format Indonesia)
      // Contoh: 1.234.567,89
      result = parseFloat(
        cleaned
          .replace(/\./g, '')  // Hapus titik (ribuan)
          .replace(',', '.')   // Ganti koma dengan titik
      );
    }
  } else if (dotCount > 1) {
    // Hanya ada titik dan lebih dari satu (format Indonesia tanpa desimal)
    // Contoh: 1.234.567
    result = parseFloat(cleaned.replace(/\./g, ''));
  } else if (commaCount > 1) {
    // Hanya ada koma dan lebih dari satu (format internasional tanpa desimal)
    // Contoh: 1,234,567
    result = parseFloat(cleaned.replace(/,/g, ''));
  } else if (dotCount === 1) {
    // Hanya satu titik - bisa jadi desimal atau ribuan
    const parts = cleaned.split('.');
    if (parts[1].length === 2 || parts[1].length === 3) {
      // Panjang bagian desimal 2 atau 3 digit, mungkin uang
      // Coba format Indonesia dulu
      if (parts[0].length <= 3) {
        // Format: 1.000 (ribuan Indonesia)
        result = parseFloat(parts[0] + parts[1]);
      } else {
        // Format: 1000.00 (desimal internasional)
        result = parseFloat(cleaned);
      }
    } else {
      // Asumsi format internasional dengan desimal
      result = parseFloat(cleaned);
    }
  } else if (commaCount === 1) {
    // Hanya satu koma - bisa jadi desimal atau ribuan
    const parts = cleaned.split(',');
    if (parts[1].length === 2 || parts[1].length === 3) {
      // Panjang bagian desimal 2 atau 3 digit, mungkin uang
      // Coba format Indonesia
      if (parts[0].length <= 3) {
        // Format: 1,000 (ribuan internasional)
        result = parseFloat(parts[0] + parts[1]);
      } else {
        // Format: 1000,00 (desimal Indonesia)
        result = parseFloat(parts[0] + '.' + parts[1]);
      }
    } else {
      // Asumsi format Indonesia dengan desimal
      result = parseFloat(parts[0] + '.' + parts[1]);
    }
  } else {
    // Tidak ada titik atau koma
    result = parseFloat(cleaned);
  }
  
  result = isNaN(result) ? 0 : result;
  return isNegative ? -result : result;
}

export const roundToPrecision = (num: number, precision: number): number => {
  if (precision === 0) return Math.round(num);
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
};

export const formatNumber = (
  num: number,
  decimalSeparator: string = ',',
  thousandSeparator: string = '.',
  precision: number = 2,
  minimumFractionDigits: number = 0
): string => {
  try {
    const fixedNum = Math.abs(num).toFixed(precision);
    const [integer, decimal] = fixedNum.split('.');
    
    // Format integer part with thousand separators
    const formattedInteger = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSeparator
    );
    
    if (!decimal && minimumFractionDigits <= 0) {
      return formattedInteger;
    }
    
    let formattedDecimal = decimal || '';
    if (minimumFractionDigits > 0) {
      formattedDecimal = (decimal || '').padEnd(minimumFractionDigits, '0');
    }
    
    return `${formattedInteger}${decimalSeparator}${formattedDecimal}`;
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0';
  }
};

export const generateAlias = (options: Record<string, unknown>): string => {
  return `rp_${Object.values(options).join('_')}`.replace(/[^a-zA-Z0-9_]/g, '');
};

export const abbreviateNumber = (num: number, precision: number = 1): string => {
  const absNum = Math.abs(num);
  if (absNum >= 1e12) return `${(num / 1e12).toFixed(precision)}T`;
  if (absNum >= 1e9) return `${(num / 1e9).toFixed(precision)}B`;
  if (absNum >= 1e6) return `${(num / 1e6).toFixed(precision)}M`;
  if (absNum >= 1e3) return `${(num / 1e3).toFixed(precision)}K`;
  return num.toString();
};

export const calculatePercentageDifference = (
  oldValue: number,
  newValue: number
): number => {
  if (oldValue === 0) return newValue > 0 ? 100 : newValue < 0 ? -100 : 0;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
};