/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * A human being
 */
export type Person = Person1 & Person2;
export type Person1 = {
  [k: string]: unknown;
};
/**
 * Unique identifier of a person in the format of UUID
 */
export type ID = string;
/**
 * Person's preferred full name
 */
export type Name = string;
/**
 * List of organizations a person is a member of
 *
 * @minItems 1
 */
export type MemberOf = [Organization, ...Organization[]];
/**
 * Unique identifier of an organization in the format of UUID
 */
export type ID1 = string;

export interface Person2 {
  id: ID;
  name?: Name;
  /**
   * Family name (last name)
   */
  familyName?: string;
  /**
   * Given name (first name)
   */
  givenName?: string;
  /**
   * Additional name (middle name)
   */
  additionalName?: string;
  /**
   * Honorifics preceding a person's name
   */
  honorificPrefix?: string;
  /**
   * Honorifics following a person's name
   */
  honorificSuffix?: string;
  /**
   * A name to use in a lexicographically ordered list
   */
  sortName?: string;
  /**
   * Alternate names to use for example in search
   */
  alternateNames?: string[];
  memberOf?: MemberOf;
  [k: string]: unknown;
}
/**
 * Reference to an organization
 */
export interface Organization {
  id: ID1;
  [k: string]: unknown;
}