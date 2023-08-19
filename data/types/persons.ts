/**
 * List of persons
 *
 * A human being
 */
export interface Persons {
    /**
     * Additional name (middle name)
     */
    additionalName?: string;
    /**
     * Alternate names to use for example in search
     */
    alternateNames?: string[];
    /**
     * Family name (last name)
     */
    familyName?: string;
    /**
     * Given name (first name)
     */
    givenName?: string;
    /**
     * Honorifics preceding a person's name
     */
    honorificPrefix?: string;
    /**
     * Honorifics following a person's name
     */
    honorificSuffix?: string;
    /**
     * Unique identifier of a person in the format of UUID
     */
    id: string;
    /**
     * List of organizations a person is a member of
     */
    memberOf?: Organization[];
    /**
     * Person's preferred full name
     */
    name?: string;
    /**
     * A name to use in a lexicographically ordered list
     */
    sortName?: string;
    [property: string]: any;
}

/**
 * Reference to an organization
 */
export interface Organization {
    id: string;
    [property: string]: any;
}
