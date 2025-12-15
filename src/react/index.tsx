import React from 'react';
import type { InputValue, RupiahFormatOptions } from '../utils/types';
import { useRupiah, useRupiahFormat } from '../hooks/useRupiah';
import { RupiahDisplay, MemoizedRupiahDisplay } from './RupiahDisplay';

// React convenience component
export const Rupiah: React.FC<{
  value: InputValue;
  options?: Partial<RupiahFormatOptions>;
  className?: string;
}> = ({ value, options, className }) => {
  return (
    <RupiahDisplay
      value={value}
      className={className}
      {...options}
    />
  );
};

export { useRupiah, useRupiahFormat, RupiahDisplay, MemoizedRupiahDisplay };