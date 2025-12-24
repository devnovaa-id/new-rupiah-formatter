import React from 'react';
import type { InputValue, RupiahFormatOptions } from '../utils/types';
import { useRupiah, useRupiahFormat, useRupiahState, useRupiahInput } from '../hooks/useRupiah';
import { RupiahDisplay, MemoizedRupiahDisplay, type RupiahDisplayProps } from './RupiahDisplay';

// Export type untuk RupiahDisplayProps
export type { RupiahDisplayProps };

// React convenience component
export const Rupiah: React.FC<{
  value: InputValue;
  options?: Partial<RupiahFormatOptions>;
  className?: string;
}> = ({ value, options, className }) => {
  return React.createElement(
    RupiahDisplay,
    {
      value,
      className,
      ...options
    }
  );
};

export { useRupiah, useRupiahFormat, useRupiahState, useRupiahInput, RupiahDisplay, MemoizedRupiahDisplay };