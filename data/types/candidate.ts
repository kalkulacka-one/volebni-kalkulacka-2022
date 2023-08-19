/**
 * Candidate for a calculator
 */
export interface Candidate {
    /**
     * Unique identifier of a candidate in the format of UUID
     */
    id: string;
    /**
     * Reference to a person or an organization which is a candidate
     */
    reference: PersonOrOrganizationReference;
    [property: string]: any;
}

/**
 * Reference to a person or an organization which is a candidate
 */
export interface PersonOrOrganizationReference {
    /**
     * Unique identifier of a reference in the format of UUID
     */
    id: string;
    /**
     * Type of a reference: either a person or an organization
     */
    type: Type;
    [property: string]: any;
}

/**
 * Type of a reference: either a person or an organization
 */
export enum Type {
    Organization = "organization",
    Person = "person",
}
