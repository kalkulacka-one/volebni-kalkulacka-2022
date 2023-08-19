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
