/**
 * Question for a calculator
 */
export interface Question {
    /**
     * A detailed description or an explanation of a question
     */
    detail?: string;
    /**
     * Unique identifier of a question in the format of UUID
     */
    id: string;
    /**
     * A statment to agree or disagree with, should not be phrased as a question with question
     * mark
     */
    statement: string;
    /**
     * Title of a question
     */
    title: string;
    [property: string]: any;
}
