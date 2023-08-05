type CBool = 'Yes' | 'No';
type CKey = string;
export type CUrl = string;
type CDateTime = string;
type CSheetName = string;

/**
 * This type represents rows from the input Google Sheet that
 * represents all existing calculators.
 *
 * https://docs.google.com/spreadsheets/d/1rEtloBTzS_fZyeIX9wYYW32Pg2NeJNYj6oQbyIyTTvw/view#gid=0
 */
export type CalculatorRowData = {
  'Election name': string;
  'Election key': CKey;

  'District name': string;
  'District key': CKey;
  Name: string;
  Description: string;
  'Show description'?: CBool;
  Round: string;
  Variant: string;
  'Election from': CDateTime;
  'Election to': CDateTime;
  'Questions pool': CUrl;
  'Questions spreadsheet': CUrl;
  'Questions sheet': CSheetName;
  'Questions form': CUrl;
  'Answer yes': string;
  'Answer no': string;
  'Answers spreadsheet - candidates': CUrl;
  'Answers sheet - candidates': CSheetName;
  'Answers spreadsheet - experts': CUrl;
  'Answers sheet - experts': CSheetName;
  'Candidates pool': CUrl;
  'Candidates sheet': CSheetName;
};

type QuestionsPoolRowData = {
  Uuid: string;
  Name: string;
  Question: string;
  Descript: string;
  Tags: string;
  Note: string;
  Order: string;
};

class QuestionsPool {
  questions: { [key: string]: QuestionsPoolRowData };

  constructor() {
    this.questions = {};
  }
}

export class Calculators {
  calculators: { [key: string]: CalculatorRowData };
  questionPools: { [key: string]: QuestionsPool };

  constructor() {
    this.calculators = {};
    this.questionPools = {};
  }
}
