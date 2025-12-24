import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { RupiahFormatter } from '../core/formatter';
import { RupiahFormatOptions, InputValue } from '../utils/types';

export const useRupiah = (initialOptions?: Partial<RupiahFormatOptions>) => {
  const formatterRef = useRef<RupiahFormatter | null>(null);
  const [options, setOptions] = useState(initialOptions || {});
  
  const getFormatter = useCallback(() => {
    if (!formatterRef.current) {
      try {
        formatterRef.current = new RupiahFormatter(initialOptions);
      } catch (error) {
        console.error('Error creating RupiahFormatter:', error);
        formatterRef.current = new RupiahFormatter();
      }
    }
    return formatterRef.current;
  }, [initialOptions]);
  
  const format = useCallback((value: InputValue, customOptions?: Partial<RupiahFormatOptions>) => {
    try {
      const formatter = getFormatter();
      const mergedOptions = customOptions ? { ...options, ...customOptions } : options;
      return formatter.format(value, mergedOptions);
    } catch (error) {
      console.error('Error in format hook:', error, 'value:', value);
      return initialOptions?.fallback || 'Rp 0';
    }
  }, [getFormatter, options, initialOptions?.fallback]);
  
  const parse = useCallback((formattedString: string) => {
    try {
      const formatter = getFormatter();
      return formatter.parse(formattedString);
    } catch (error) {
      console.error('Error in parse hook:', error);
      return 0;
    }
  }, [getFormatter]);
  
  const updateOptions = useCallback((newOptions: Partial<RupiahFormatOptions>) => {
    try {
      setOptions(prev => ({ ...prev, ...newOptions }));
      const formatter = getFormatter();
      formatter.updateOptions(newOptions);
    } catch (error) {
      console.error('Error updating options in hook:', error);
      throw error;
    }
  }, [getFormatter]);
  
  const createAlias = useCallback((name: string, aliasOptions: Partial<RupiahFormatOptions>) => {
    try {
      const formatter = getFormatter();
      formatter.createAlias(name, aliasOptions);
    } catch (error) {
      console.error('Error creating alias in hook:', error);
      throw error;
    }
  }, [getFormatter]);
  
  const formatWithAlias = useCallback((value: InputValue, alias: string) => {
    try {
      const formatter = getFormatter();
      return formatter.formatWithAlias(value, alias);
    } catch (error) {
      console.error('Error formatting with alias in hook:', error);
      throw error;
    }
  }, [getFormatter]);
  
  const memoizedFormatter = useMemo(() => {
    const formatter = getFormatter();
    return {
      format,
      parse,
      updateOptions,
      createAlias,
      formatWithAlias,
      getOptions: () => formatter.getOptions(),
      formatWithTemplate: (value: InputValue, template: string) => {
        try {
          return formatter.formatWithTemplate(value, template);
        } catch (error) {
          console.error('Error formatting with template in hook:', error);
          return initialOptions?.fallback || 'Rp 0';
        }
      },
      formatRange: (min: InputValue, max: InputValue, separator?: string) => {
        try {
          return formatter.formatRange(min, max, separator);
        } catch (error) {
          console.error('Error formatting range in hook:', error);
          return `${initialOptions?.fallback || 'Rp 0'} - ${initialOptions?.fallback || 'Rp 0'}`;
        }
      },
      formatWithAbbreviation: (value: InputValue, customOptions?: Partial<RupiahFormatOptions>) => {
        try {
          return formatter.formatWithAbbreviation(value, customOptions);
        } catch (error) {
          console.error('Error formatting with abbreviation in hook:', error);
          return format(value, customOptions);
        }
      },
      calculatePercentage: (value: InputValue, total: InputValue, customOptions?: Partial<RupiahFormatOptions>) => {
        try {
          return formatter.calculatePercentage(value, total, customOptions);
        } catch (error) {
          console.error('Error calculating percentage in hook:', error);
          return format(value, customOptions);
        }
      },
      calculateGrowth: (oldValue: InputValue, newValue: InputValue) => {
        try {
          return formatter.calculateGrowth(oldValue, newValue);
        } catch (error) {
          console.error('Error calculating growth in hook:', error);
          return `${format(oldValue)} → ${format(newValue)}`;
        }
      },
      clearCache: () => formatter.clearCache(),
      getCacheStats: () => formatter.getCacheStats()
    };
  }, [format, parse, updateOptions, createAlias, formatWithAlias, getFormatter, initialOptions?.fallback]);
  
  useEffect(() => {
    return () => {
      if (formatterRef.current) {
        formatterRef.current.clearCache();
      }
    };
  }, []);
  
  return memoizedFormatter;
};

export const useRupiahFormat = (
  value: InputValue,
  options?: Partial<RupiahFormatOptions>
): string => {
  const formatter = useRupiah(options);
  return formatter.format(value);
};

export const useRupiahState = (initialValue: InputValue = 0, options?: Partial<RupiahFormatOptions>) => {
  const [value, setValue] = useState(initialValue);
  const { format } = useRupiah(options);
  
  const formatted = useMemo(() => format(value), [format, value]);
  
  return {
    value,
    formatted,
    setValue,
    updateValue: setValue
  };
};

export const useRupiahInput = (
  initialValue: InputValue = 0, 
  options?: Partial<RupiahFormatOptions>,
  onChange?: (value: number) => void
) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const { format, parse } = useRupiah(options);
  const lastValidValue = useRef<number>(0);
  
  useEffect(() => {
    if (!isFocused) {
      try {
        const num = parse(initialValue.toString());
        lastValidValue.current = num;
        setInputValue(format(num));
      } catch (error) {
        console.error('Error formatting initial value:', error);
        setInputValue(format(0));
      }
    }
  }, [initialValue, format, parse, isFocused]);
  
  const numericValue = useMemo(() => {
    try {
      return inputValue ? parse(inputValue) : 0;
    } catch {
      return lastValidValue.current;
    }
  }, [inputValue, parse]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleaned = rawValue.replace(/[^\d.,-]/g, '');
    setInputValue(cleaned);
    
    try {
      const num = parse(cleaned);
      lastValidValue.current = num;
      onChange?.(num);
    } catch {
      onChange?.(lastValidValue.current);
    }
  }, [parse, onChange]);
  
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    const cleaned = inputValue.replace(/[^\d.,-]/g, '');
    setInputValue(cleaned);
  }, [inputValue]);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    try {
      if (numericValue !== 0) {
        setInputValue(format(numericValue));
      } else {
        setInputValue('');
      }
    } catch (error) {
      console.error('Error formatting on blur:', error);
      setInputValue(format(lastValidValue.current));
    }
  }, [format, numericValue]);
  
  return {
    inputValue,
    numericValue,
    formattedValue: format(numericValue),
    handleChange,
    handleFocus,
    handleBlur,
    setInputValue: (value: string) => {
      setInputValue(value);
      try {
        const num = parse(value);
        lastValidValue.current = num;
        onChange?.(num);
      } catch {
        onChange?.(lastValidValue.current);
      }
    }
  };
};