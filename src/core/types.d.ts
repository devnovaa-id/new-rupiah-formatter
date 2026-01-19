/**
 * Core Types for Rupiah Formatter
 */
export type InputValue = number | string | bigint | null | undefined;
export interface FormatOptions {
    symbol?: string;
    decimalSeparator?: string;
    thousandSeparator?: string;
    symbolPosition?: 'before' | 'after';
    spaceBetween?: boolean;
    precision?: number;
    stripTrailingZero?: boolean;
    negativeFormat?: 'sign' | 'parentheses' | 'braces' | 'none';
    fallback?: string;
    useGrouping?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    roundingMode?: 'half-up' | 'half-down' | 'floor' | 'ceil' | 'trunc';
    allowNegativeZero?: boolean;
    compact?: boolean;
    compactThreshold?: number;
    compactPrecision?: number;
    locale?: string;
    currencyDisplay?: 'symbol' | 'code' | 'name';
}
export interface ValidationResult {
    isValid: boolean;
    value?: number;
    error?: string;
    message?: string;
}
export interface FormatResult {
    formatted: string;
    value: number;
    options: FormatOptions;
    metadata: {
        isNegative: boolean;
        isZero: boolean;
        isInteger: boolean;
        decimalCount: number;
        isCompact?: boolean;
        compactUnit?: string;
        originalValue?: number;
    };
}
export interface Plugin {
    name: string;
    version: string;
    install(formatter: any, options?: any): void;
    uninstall?(): void;
    beforeFormat?(value: InputValue, options: FormatOptions): InputValue | void;
    afterFormat?(result: FormatResult): FormatResult | void;
}
export interface RupiahFormatterInstance {
    format(value: InputValue): string;
    parse(formattedString: string): number;
    validate(value: InputValue): ValidationResult;
    getOptions(): FormatOptions;
    setOptions(options: Partial<FormatOptions>): void;
    use(plugin: Plugin, options?: any): RupiahFormatterInstance;
    unuse(pluginName: string): boolean;
    destroy(): void;
}
export type SimpleFormatFunction = (value: InputValue, options?: FormatOptions) => string;
export type SimpleParseFunction = (formattedString: string) => number;
export type SimpleValidateFunction = (value: InputValue) => ValidationResult;
export interface RupiahError extends Error {
    code: string;
    details?: any;
}
export declare const ERROR_CODES: {
    readonly INVALID_INPUT: "INVALID_INPUT";
    readonly OVERFLOW: "OVERFLOW";
    readonly UNDERFLOW: "UNDERFLOW";
    readonly INVALID_FORMAT: "INVALID_FORMAT";
    readonly OPTIONS_ERROR: "OPTIONS_ERROR";
    readonly PLUGIN_ERROR: "PLUGIN_ERROR";
    readonly PARSING_ERROR: "PARSING_ERROR";
};
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
//# sourceMappingURL=types.d.ts.map