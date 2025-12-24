import React from 'react';
import { RupiahFormatter } from '../core/formatter';
import { RupiahFormatOptions, InputValue } from '../utils/types';

// Extend RupiahFormatOptions but override fallback to accept ReactNode
interface RupiahDisplayProps extends Omit<RupiahFormatOptions, 'fallback'> {
  value: InputValue;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  'data-testid'?: string;
  fallback?: React.ReactNode; // Override to accept ReactNode
  onFormatError?: (error: Error) => void;
  onFormatSuccess?: (formattedValue: string) => void;
  withAbbreviation?: boolean;
  withPercentage?: {
    total: number;
    customOptions?: Partial<RupiahFormatOptions>;
  };
  withGrowth?: {
    oldValue: InputValue;
    showArrow?: boolean;
  };
  component?: React.ElementType;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

interface RupiahDisplayState {
  formatted: string;
  error: Error | null;
  isLoading: boolean;
}

export class RupiahDisplay extends React.Component<RupiahDisplayProps, RupiahDisplayState> {
  private formatter: RupiahFormatter;
  
  constructor(props: RupiahDisplayProps) {
    super(props);
    
    // Inisialisasi state terlebih dahulu
    this.state = {
      formatted: '',
      error: null,
      isLoading: true
    };
    
    try {
      this.formatter = new RupiahFormatter({
        symbol: props.symbol,
        decimalSeparator: props.decimalSeparator,
        thousandSeparator: props.thousandSeparator,
        precision: props.precision,
        symbolPosition: props.symbolPosition,
        spaceBetween: props.spaceBetween,
        stripTrailingZero: props.stripTrailingZero,
        negativeFormat: props.negativeFormat,
        hideZero: props.hideZero,
        fallback: typeof props.fallback === 'string' ? props.fallback : 'Rp 0',
        locale: props.locale,
        currencyCode: props.currencyCode,
        minimumFractionDigits: props.minimumFractionDigits,
        maximumFractionDigits: props.maximumFractionDigits,
        formatStyle: props.formatStyle
      });
    } catch (error) {
      console.error('Error creating RupiahFormatter:', error);
      this.formatter = new RupiahFormatter();
      this.setState({
        error: error instanceof Error ? error : new Error('Failed to create formatter')
      });
    }
  }
  
  componentDidMount() {
    this.formatValue();
  }
  
  componentDidUpdate(prevProps: RupiahDisplayProps) {
    const propsToCheck: (keyof RupiahDisplayProps)[] = [
      'value', 'symbol', 'decimalSeparator', 'thousandSeparator',
      'precision', 'symbolPosition', 'spaceBetween', 'stripTrailingZero',
      'negativeFormat', 'hideZero', 'locale', 'withAbbreviation'
    ];
    
    const hasChanged = propsToCheck.some(prop => 
      this.props[prop] !== prevProps[prop]
    );
    
    const percentageChanged = JSON.stringify(this.props.withPercentage) !== JSON.stringify(prevProps.withPercentage);
    const growthChanged = JSON.stringify(this.props.withGrowth) !== JSON.stringify(prevProps.withGrowth);
    
    if (hasChanged || percentageChanged || growthChanged) {
      this.formatValue();
    }
  }
  
  private formatValue() {
    this.setState({ isLoading: true, error: null });
    
    try {
      const {
        value,
        withAbbreviation,
        withPercentage,
        withGrowth
      } = this.props;
      
      let result = this.formatter.format(value);
      
      if (withAbbreviation) {
        result = this.formatter.formatWithAbbreviation(value);
      }
      
      if (withPercentage) {
        result = this.formatter.calculatePercentage(value, withPercentage.total, withPercentage.customOptions);
      }
      
      if (withGrowth) {
        const growthResult = this.formatter.calculateGrowth(withGrowth.oldValue, value);
        if (withGrowth.showArrow) {
          result = `${this.formatter.format(withGrowth.oldValue)} → ${result}`;
        } else {
          result = growthResult;
        }
      }
      
      this.setState({ formatted: result, isLoading: false });
      this.props.onFormatSuccess?.(result);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Formatting error');
      console.error('Error formatting value in RupiahDisplay:', error);
      this.setState({ error: err, isLoading: false });
      this.props.onFormatError?.(err);
    }
  }
  
  render() {
    const {
      className,
      style,
      title,
      'data-testid': testId,
      fallback = 'Rp 0',
      component: Component = 'span',
      loadingComponent,
      errorComponent,
      ...props
    } = this.props;
    
    const { formatted, error, isLoading } = this.state;
    
    if (isLoading && loadingComponent) {
      return React.createElement(React.Fragment, null, loadingComponent);
    }
    
    if (error) {
      if (errorComponent) {
        return React.createElement(React.Fragment, null, errorComponent);
      }
      
      return React.createElement(
        Component,
        {
          className: `rupiah-error ${className || ''}`,
          style,
          title,
          'data-testid': testId ? `${testId}-error` : undefined,
          ...props
        },
        typeof fallback === 'string' ? fallback : fallback
      );
    }
    
    return React.createElement(
      Component,
      {
        className: `rupiah-display ${className || ''}`,
        style,
        title,
        'data-testid': testId,
        ...props
      },
      formatted
    );
  }
}

export const MemoizedRupiahDisplay = React.memo(RupiahDisplay, (prevProps, nextProps) => {
  const propsToCheck = [
    'value', 'symbol', 'decimalSeparator', 'thousandSeparator',
    'precision', 'stripTrailingZero', 'hideZero', 'withAbbreviation'
  ];
  
  for (const prop of propsToCheck) {
    if (prevProps[prop as keyof RupiahDisplayProps] !== nextProps[prop as keyof RupiahDisplayProps]) {
      return false;
    }
  }
  
  if (JSON.stringify(prevProps.withPercentage) !== JSON.stringify(nextProps.withPercentage)) {
    return false;
  }
  
  if (JSON.stringify(prevProps.withGrowth) !== JSON.stringify(nextProps.withGrowth)) {
    return false;
  }
  
  return true;
});

// Export type untuk digunakan di file lain
export type { RupiahDisplayProps };