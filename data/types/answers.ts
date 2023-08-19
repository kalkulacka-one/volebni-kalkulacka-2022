/**
 * List of one or more answers
 *
 * Answer to a question of a calculator
 */
export interface Answers {
    /**
     * Yes (`true`), no (`false`) or neutral (`null`) answer to a question
     */
    answer?: boolean | null;
    /**
     * Whether a question was marked as important
     */
    isImportant?: boolean;
    /**
     * Unique identifier of an answered question in the format of UUID
     */
    questionId: string;
    [property: string]: any;
}
