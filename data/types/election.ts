/**
 * Election provides various details about an election such as districts and rounds
 */
export interface Election {
    calculatorGroup: CalculatorGroup;
    createdAt:       Date;
    description?:    string;
    districts?:      District[];
    id:              string;
    key:             string;
    publishedAt?:    Date;
    rounds?:         Round[];
    shortTitle:      string;
    title:           string;
    updatedAt?:      Date;
    [property: string]: any;
}

/**
 * Reference to a calculator group with election calculators
 */
export interface CalculatorGroup {
    id:  string;
    key: string;
    [property: string]: any;
}

/**
 * Geographical area of an election
 */
export interface District {
    /**
     * Official district code assigned by the election authority
     */
    code?: string;
    /**
     * Human-friendly unique key of a district in the hyphen-separated lowercased format
     */
    key: string;
    [property: string]: any;
}

/**
 * Round of an election
 */
export interface Round {
    /**
     * Round ordinal number from 0
     */
    number: number;
    /**
     * One or multiple voting hours for the round
     */
    votingHours?: VotingPeriod[];
    [property: string]: any;
}

export interface VotingPeriod {
    /**
     * End date (or time) of a voting period in the ISO 8601 format
     */
    end: Date;
    /**
     * Start date (or time) of a voting period in the ISO 8601 format
     */
    start: Date;
    [property: string]: any;
}
