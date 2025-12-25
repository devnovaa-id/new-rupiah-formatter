import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, jest } from '@jest/globals';

// Import React components from the src
import { RupiahDisplay, useRupiah, useRupiahFormat, useRupiahState, useRupiahInput } from '../src/react';

// Mock console.error to suppress error logs
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('RupiahDisplay Component', () => {
  test('renders formatted value correctly', () => {
    render(<RupiahDisplay value={1000} />);
    expect(screen.getByText('Rp 1.000')).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<RupiahDisplay value={1000} className="test-class" />);
    const element = screen.getByText('Rp 1.000');
    expect(element).toHaveClass('test-class');
  });

  test('renders with custom options', () => {
    render(
      <RupiahDisplay 
        value={1000} 
        symbol="IDR"
        decimalSeparator="."
        thousandSeparator=","
      />
    );
    expect(screen.getByText('IDR 1,000')).toBeInTheDocument();
  });

  test('renders fallback for invalid value', () => {
    render(<RupiahDisplay value="invalid" fallback="N/A" />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  test('renders with abbreviation', () => {
    render(<RupiahDisplay value={1500} withAbbreviation />);
    expect(screen.getByText(/Rp 1\.500 \(\≈1\.5K\)/)).toBeInTheDocument();
  });

  test('renders with percentage', () => {
    render(
      <RupiahDisplay 
        value={500} 
        withPercentage={{ total: 1000 }}
      />
    );
    expect(screen.getByText(/Rp 500 \(50\.0%\)/)).toBeInTheDocument();
  });

  test('renders with growth', () => {
    render(
      <RupiahDisplay 
        value={1500} 
        withGrowth={{ oldValue: 1000 }}
      />
    );
    expect(screen.getByText(/Rp 1\.000 → Rp 1\.500 \(\+50\.0%\)/)).toBeInTheDocument();
  });

  test('handles component prop', () => {
    render(
      <RupiahDisplay 
        value={1000} 
        component="div"
        data-testid="custom-component"
      />
    );
    expect(screen.getByTestId('custom-component')).toBeInTheDocument();
  });
});

describe('useRupiah Hook', () => {
  const TestComponent = ({ value, options }: { value: any, options?: any }) => {
    const { format } = useRupiah(options);
    return <div data-testid="formatted">{format(value)}</div>;
  };

  test('formats value using hook', () => {
    render(<TestComponent value={1000} />);
    expect(screen.getByTestId('formatted')).toHaveTextContent('Rp 1.000');
  });

  test('formats value with custom options', () => {
    render(
      <TestComponent 
        value={1000} 
        options={{ symbol: 'IDR' }}
      />
    );
    expect(screen.getByTestId('formatted')).toHaveTextContent('IDR 1.000');
  });
});

describe('useRupiahFormat Hook', () => {
  const TestComponent = ({ value, options }: { value: any, options?: any }) => {
    const formatted = useRupiahFormat(value, options);
    return <div data-testid="formatted">{formatted}</div>;
  };

  test('formats value', () => {
    render(<TestComponent value={1000} />);
    expect(screen.getByTestId('formatted')).toHaveTextContent('Rp 1.000');
  });
});

describe('useRupiahState Hook', () => {
  const TestComponent = () => {
    const { value, formatted, setValue } = useRupiahState(1000);
    return (
      <div>
        <div data-testid="value">{String(value)}</div>
        <div data-testid="formatted">{formatted}</div>
        <button onClick={() => setValue(2000)}>Update</button>
      </div>
    );
  };

  test('initial state', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('value')).toHaveTextContent('1000');
    expect(screen.getByTestId('formatted')).toHaveTextContent('Rp 1.000');
  });

  test('updates state', () => {
    render(<TestComponent />);
    fireEvent.click(screen.getByText('Update'));
    expect(screen.getByTestId('value')).toHaveTextContent('2000');
    expect(screen.getByTestId('formatted')).toHaveTextContent('Rp 2.000');
  });
});

describe('useRupiahInput Hook', () => {
  const TestComponent = ({ initialValue }: { initialValue?: any }) => {
    const { inputValue, handleChange, formattedValue } = useRupiahInput(initialValue);
    return (
      <div>
        <input 
          data-testid="input" 
          value={inputValue} 
          onChange={handleChange} 
        />
        <div data-testid="formatted">{formattedValue}</div>
      </div>
    );
  };

  test('initial value', () => {
    render(<TestComponent initialValue={1000} />);
    expect(screen.getByTestId('input')).toHaveValue('1000');
    expect(screen.getByTestId('formatted')).toHaveTextContent('Rp 1.000');
  });

  test('handles input change', async () => {
    render(<TestComponent initialValue={1000} />);
    const input = screen.getByTestId('input');
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '2000' } });
    
    expect(input).toHaveValue('2000');
    
    fireEvent.blur(input);
    
    await waitFor(() => {
      expect(screen.getByTestId('formatted')).toHaveTextContent('Rp 2.000');
    });
  });
});