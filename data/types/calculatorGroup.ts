/**
 * Group of two or more calculators
 */
export interface CalculatorGroup {
    createdAt:    Date;
    description?: string;
    election?:    Election;
    id:           string;
    key:          string;
    publishedAt?: Date;
    shortTitle?:  string;
    title?:       string;
    updatedAt?:   Date;
    variants?:    OrderedListOfCalculatorVariant[];
    calculators:  Calculator[];
    [property: string]: any;
}

export interface Calculator {
    id:        string;
    variant?:  Variant;
    district?: District;
    round?:    Round;
    [property: string]: any;
}

export interface District {
    key: string;
    [property: string]: any;
}

export interface Round {
    number: number;
    [property: string]: any;
}

export interface Variant {
    key: string;
    [property: string]: any;
}

/**
 * Reference to an election the calculator belongs to
 */
export interface Election {
    id:  string;
    key: string;
    [property: string]: any;
}

export interface OrderedListOfCalculatorVariant {
    key?: string;
    [property: string]: any;
}
