/**
 * Variant of a calculator
 */
export interface Variant {
    /**
     * Human-friendly unique key of a variant in the hyphen-separated lowercased format
     */
    key: string;
    [property: string]: any;
}
