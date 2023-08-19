/**
 * Calculator is a set of questions, candidates and their answers
 */
export interface Calculator {
    createdAt:        Date;
    description?:     string;
    id:               string;
    publishedAt?:     Date;
    shortTitle?:      string;
    title?:           string;
    updatedAt?:       Date;
    key?:             string;
    calculatorGroup?: CalculatorGroup;
    variant?:         Variant;
    district?:        District;
    election?:        Election;
    round?:           Round;
    [property: string]: any;
}

/**
 * Reference to a calculator group the calculator belongs to
 */
export interface CalculatorGroup {
    id:  string;
    key: string;
    [property: string]: any;
}

export interface District {
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

export interface Round {
    number: number;
    [property: string]: any;
}

export interface Variant {
    key: string;
    [property: string]: any;
}
