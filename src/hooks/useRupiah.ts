import { useState, useCallback, useMemo } from 'react';
import { RupiahFormatter } from '../core/formatter';
import { RupiahFormatOptions, InputValue } from '../utils/types';

export const useRupiah = (initialOptions?: Partial<RupiahFormatOptions>) => {
  const [formatter] = useState(() => new RupiahFormatter(initialOptions));
  const [options, setOptions] = useState(initialOptions || {});
  
  const format = useCallback((value: InputValue, customOptions?: Partial<RupiahFormatOptions>) => {
    return formatter.format(value, { ...options, ...customOptions });
  }, [formatter, options]);
  
  const updateOptions = useCallback((newOptions: Partial<RupiahFormatOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
    formatter.updateOptions(newOptions);
  }, [formatter]);
  
  const memoizedFormatter = useMemo(() => ({
    format,
    parse: formatter.parse.bind(formatter),
    updateOptions,
    createAlias: formatter.createAlias.bind(formatter),
    formatWithAlias: formatter.formatWithAlias.bind(formatter),
    getOptions: formatter.getOptions.bind(formatter)
  }), [format, updateOptions, formatter]);
  
  return memoizedFormatter;
};

// Convenience hook for direct formatting
export const useRupiahFormat = (
  value: InputValue,
  options?: Partial<RupiahFormatOptions>
): string => {
  const formatter = useRupiah(options);
  return formatter.format(value);
};