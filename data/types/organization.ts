/**
 * Organization is a group of people, for example a political party, a movement, etc.
 */
export interface Organization {
    /**
     * Organization's abbreviation with max. 15 characters
     */
    abbreviation?: string;
    /**
     * Alternate names to use for example in search
     */
    alternateNames?: string[];
    /**
     * Unique identifier of an organization in the format of UUID
     */
    id: string;
    /**
     * List of members of an organization
     */
    members?: Member[];
    /**
     * Organization's preferred full name
     */
    name: string;
    /**
     * Organization's official name with an unlimited length
     */
    officialName?: string;
    /**
     * Organization's short name with max. 25 characters
     */
    shortName?: string;
    /**
     * A name to use in a lexicographically ordered list
     */
    sortName?: string;
    [property: string]: any;
}

/**
 * Reference to a person
 *
 * Reference to an organization
 */
export interface Member {
    id:   string;
    type: Type;
    [property: string]: any;
}

export enum Type {
    Organization = "organization",
    Person = "person",
}
