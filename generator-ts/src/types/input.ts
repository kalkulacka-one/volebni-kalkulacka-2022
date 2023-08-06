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

export class CalculatorRow {
  electionName: string;
  electionKey: CKey;

  districtName: string;
  districtKey: CKey;
  name: string;
  description: string;
  showDescription?: CBool;
  round: string;
  variant: string;
  electionFrom: CDateTime;
  electionTo: CDateTime;
  questionsPool: CUrl;
  questionsSpreadsheet: CUrl;
  questionsSheet: CSheetName;
  questionsForm: CUrl;
  answerYes: string;
  answerNo: string;
  answersSpreadsheetCandidates: CUrl;
  answersSheetCandidates: CSheetName;
  answersSpreadsheetExperts: CUrl;
  answersSheetExperts: CSheetName;
  candidatesPool: CUrl;
  candidatesSheet: CSheetName;

  constructor(data: Partial<CalculatorRow>) {
    this.electionName = data.electionName || '';
    this.electionKey = data.electionKey || '';
    this.districtName = data.districtName || '';
    this.districtKey = data.districtKey || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.showDescription = data.showDescription || 'No';
    this.round = data.round || '';
    this.variant = data.variant || '';
    this.electionFrom = data.electionFrom || '';
    this.electionTo = data.electionTo || '';
    this.questionsPool = data.questionsPool || '';
    this.questionsSpreadsheet = data.questionsSpreadsheet || '';
    this.questionsSheet = data.questionsSheet || '';
    this.questionsForm = data.questionsForm || '';
    this.answerYes = data.answerYes || '';
    this.answerNo = data.answerNo || '';
    this.answersSpreadsheetCandidates = data.answersSpreadsheetCandidates || '';
    this.answersSheetCandidates = data.answersSheetCandidates || '';
    this.answersSpreadsheetExperts = data.answersSpreadsheetExperts || '';
    this.answersSheetExperts = data.answersSheetExperts || '';
    this.candidatesPool = data.candidatesPool || '';
    this.candidatesSheet = data.candidatesSheet || '';
  }
}

export type QuestionsPoolRowData = {
  Uuid: string;
  Name: string;
  Question: string;
  Descript: string;
  Tags: string;
  Note: string;
  Order: string;
};

export class QuestionsPoolRow {
  Pos: number;
  Uuid: string;
  Name: string;
  Question: string;
  Descript: string;
  Tags: string[];
  Note: string;
  Order: number;

  constructor(pos: number, data: Partial<QuestionsPoolRow>) {
    this.Pos = pos;
    this.Uuid = data.Uuid || '';
    this.Name = data.Name || '';
    this.Question = data.Question || '';
    this.Descript = data.Descript || '';
    this.Tags = data.Tags || [];
    this.Note = data.Note || '';
    this.Order = data.Order || NaN;
  }
}

export type QuestionRowData = {
  Uuid: string;
  Name: string;
  Order: string;
};

export class QuestionsRow {
  Pos: number;
  Uuid: string;
  Name: string;
  Order: number;

  constructor(pos: number, data: Partial<QuestionsRow>) {
    this.Pos = pos;
    this.Uuid = data.Uuid || '';
    this.Name = data.Name || '';
    this.Order = data.Order || NaN;
  }
}

export class QuestionsPool {
  questions: { [key: string]: QuestionsPoolRow };

  constructor() {
    this.questions = {};
  }

  append(row: QuestionsPoolRow) {
    this.questions[row.Uuid] = row;
  }

  contains(row: QuestionsPoolRow): boolean {
    return row.Uuid in this.questions;
  }
}

export class Questions {
  questions: { [title: string]: QuestionsRow[] };

  constructor() {
    this.questions = {};
  }

  append(title: string, row: QuestionsRow) {
    if (!(title in this.questions)) {
      this.questions[title] = [];
    }
    this.questions[title].push(row);
  }
}

export class Calculator {
  calculator: CalculatorRow;
  questionsPool: QuestionsPool;
  questions: Questions;

  constructor(
    calculator: CalculatorRow,
    questionsPool: QuestionsPool,
    questions: Questions,
  ) {
    this.calculator = calculator;
    this.questionsPool = questionsPool;
    this.questions = questions;
  }

  key(): string {
    return this.calculator.electionKey;
  }
}

export class Calculators {
  calculators: { [key: string]: Calculator[] };
  questionPools: { [key: string]: QuestionsPool };
  questions: { [key: string]: Questions };

  constructor() {
    this.calculators = {};
    this.questionPools = {};
    this.questions = {};
  }

  appendCalculator(calculator: Calculator) {
    const key = calculator.key();
    if (!(key in this.calculators)) {
      this.calculators[key] = [];
    }
    this.calculators[key].push(calculator);
  }

  getQuestionPool(url: CUrl): QuestionsPool | undefined {
    return this.questionPools[url];
  }

  setQuestionsPool(url: CUrl, pool: QuestionsPool) {
    this.questionPools[url] = pool;
  }

  getQuestions(url: CUrl): Questions | undefined {
    return this.questions[url];
  }

  setQuestions(url: CUrl, questions: Questions) {
    this.questions[url] = questions;
  }
}
