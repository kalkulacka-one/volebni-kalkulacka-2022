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
