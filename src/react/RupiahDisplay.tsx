import React from 'react';
import { RupiahFormatter } from '../core/formatter';
import { RupiahFormatOptions, InputValue } from '../utils/types';

interface RupiahDisplayProps extends RupiahFormatOptions {
  value: InputValue;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  'data-testid'?: string;
  fallback?: React.ReactNode;
  onFormatError?: (error: Error) => void;
}

export const RupiahDisplay: React.FC<RupiahDisplayProps> = ({
  value,
  symbol,
  decimalSeparator,
  thousandSeparator,
  precision,
  symbolPosition,
  spaceBetween,
  stripTrailingZero,
  negativeFormat,
  fallback = 'Rp 0',
  className,
  style,
  title,
  'data-testid': testId,
  onFormatError,
  ...props
}) => {
  const [formatted, setFormatted] = React.useState<string>('');
  const [error, setError] = React.useState<Error | null>(null);
  
  React.useEffect(() => {
    try {
      const formatter = new RupiahFormatter({
        symbol,
        decimalSeparator,
        thousandSeparator,
        precision,
        symbolPosition,
        spaceBetween,
        stripTrailingZero,
        negativeFormat,
        fallback: typeof fallback === 'string' ? fallback : 'Rp 0'
      });
      
      const result = formatter.format(value);
      setFormatted(result);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Formatting error');
      setError(error);
      setFormatted('');
      onFormatError?.(error);
    }
  }, [
    value, symbol, decimalSeparator, thousandSeparator, precision,
    symbolPosition, spaceBetween, stripTrailingZero, negativeFormat,
    fallback, onFormatError
  ]);
  
  if (error) {
    return (
      <span
        className={`rupiah-error ${className || ''}`}
        style={style}
        title={title}
        data-testid={testId ? `${testId}-error` : undefined}
      >
        {typeof fallback === 'string' ? fallback : fallback}
      </span>
    );
  }
  
  return (
    <span
      className={`rupiah-display ${className || ''}`}
      style={style}
      title={title}
      data-testid={testId}
      {...props}
    >
      {formatted}
    </span>
  );
};

// Memoized version for performance
export const MemoizedRupiahDisplay = React.memo(RupiahDisplay);