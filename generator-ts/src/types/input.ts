import { Type } from 'class-transformer';

type CBool = 'Yes' | 'No';
type CKey = string;
export type CUrl = string;
type CDateTime = string;
type CSheetName = string;
type CCandidateType = 'Person' | 'Party' | 'Coalition';

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
  'Candidates spreadsheet': CUrl;
  'Candidates sheet': CSheetName;
};

export class CalculatorRow {
  Pos: number;
  ElectionName: string;
  ElectionKey: CKey;

  DistrictName: string;
  DistrictKey: CKey;
  Name: string;
  Description: string;
  ShowDescription?: CBool;
  Round: string;
  Variant: string;
  ElectionFrom: CDateTime;
  ElectionTo: CDateTime;
  QuestionsPool: CUrl;
  QuestionsSpreadsheet: CUrl;
  QuestionsSheet: CSheetName;
  QuestionsForm: CUrl;
  AnswerYes: string;
  AnswerNo: string;
  AnswersSpreadsheetCandidates: CUrl;
  AnswersSheetCandidates: CSheetName;
  AnswersSpreadsheetExperts: CUrl;
  AnswersSheetExperts: CSheetName;
  CandidatesPool: CUrl;
  CandidatesSpreadsheet: CUrl;
  CandidatesSheet: CSheetName;

  constructor(pos: number, data: Partial<CalculatorRow>) {
    this.Pos = pos;
    this.ElectionName = data.ElectionName || '';
    this.ElectionKey = data.ElectionKey || '';
    this.DistrictName = data.DistrictName || '';
    this.DistrictKey = data.DistrictKey || '';
    this.Name = data.Name || '';
    this.Description = data.Description || '';
    this.ShowDescription = data.ShowDescription || 'No';
    this.Round = data.Round || '';
    this.Variant = data.Variant || '';
    this.ElectionFrom = data.ElectionFrom || '';
    this.ElectionTo = data.ElectionTo || '';
    this.QuestionsPool = data.QuestionsPool || '';
    this.QuestionsSpreadsheet = data.QuestionsSpreadsheet || '';
    this.QuestionsSheet = data.QuestionsSheet || '';
    this.QuestionsForm = data.QuestionsForm || '';
    this.AnswerYes = data.AnswerYes || '';
    this.AnswerNo = data.AnswerNo || '';
    this.AnswersSpreadsheetCandidates = data.AnswersSpreadsheetCandidates || '';
    this.AnswersSheetCandidates = data.AnswersSheetCandidates || '';
    this.AnswersSpreadsheetExperts = data.AnswersSpreadsheetExperts || '';
    this.AnswersSheetExperts = data.AnswersSheetExperts || '';
    this.CandidatesPool = data.CandidatesPool || '';
    this.CandidatesSpreadsheet = data.CandidatesSpreadsheet || '';
    this.CandidatesSheet = data.CandidatesSheet || '';
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
  @Type(() => QuestionsPoolRow)
  questions: Record<string, QuestionsPoolRow>;

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
  @Type(() => QuestionsRow)
  questions: Record<string, QuestionsRow[]>;

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
  @Type(() => CalculatorRow)
  calculator: CalculatorRow;

  @Type(() => QuestionsPool)
  questionsPool: QuestionsPool;

  @Type(() => Questions)
  questions: Questions;

  @Type(() => CandidatesPool)
  candidatesPool: CandidatesPool;

  @Type(() => Candidates)
  candidates: Candidates;

  @Type(() => Answers)
  answersCandidates: Answers;

  @Type(() => Answers)
  answersExperts: Answers;

  constructor(
    calculator: CalculatorRow,
    questionsPool: QuestionsPool,
    questions: Questions,
    candidatesPool: CandidatesPool,
    candidates: Candidates,
    answersCandidates: Answers,
    answersExperts: Answers,
  ) {
    this.calculator = calculator;
    this.questionsPool = questionsPool;
    this.questions = questions;
    this.candidatesPool = candidatesPool;
    this.candidates = candidates;
    this.answersCandidates = answersCandidates;
    this.answersExperts = answersExperts;
  }

  key(): string {
    return this.calculator.ElectionKey;
  }
}

export type CandidatesPoolRowData = {
  Uuid: string;
  Name: string;
  Abbriviation: string;
  'First name': string;
  'Last name': string;
  Type: CCandidateType;
};

export class CandidatesPoolRow {
  Pos: number;
  Uuid: string;
  Name: string;
  Abbriviation: string;
  FirstName: string;
  LastName: string;
  Type: CCandidateType;

  constructor(pos: number, data: Partial<CandidatesPoolRow>) {
    this.Pos = pos;
    this.Uuid = data.Uuid || '';
    this.Name = data.Name || '';
    this.Abbriviation = data.Abbriviation || '';
    this.FirstName = data['First name'] || '';
    this.LastName = data['Last name'] || '';
    this.Type = data.Type || 'Person';
  }
}

export class CandidatesPool {
  @Type(() => CandidatesPoolRow)
  candidates: Record<string, CandidatesPoolRow>;

  constructor() {
    this.candidates = {};
  }

  append(row: CandidatesPoolRow) {
    this.candidates[row.Uuid] = row;
  }

  contains(row: CandidatesPoolRow): boolean {
    return row.Uuid in this.candidates;
  }
}

export type CandidatesRowData = {
  Uuid: string;
  Name: string;
  'Secret code': string;
  'Member of': string;
  Members: string;
};

export class CandidatesRow {
  Pos: number;
  Uuid: string;
  Name: string;
  SecretCode: string;
  MemberOf: string;
  Members: string;

  constructor(pos: number, data: Partial<CandidatesRow>) {
    this.Pos = pos;
    this.Uuid = data.Uuid || '';
    this.Name = data.Name || '';
    this.SecretCode = data['Secret code'] || '';
    this.MemberOf = data['Member of'] || '';
    this.Members = data.Members || '';
  }
}

export class Candidates {
  @Type(() => CandidatesRow)
  candidates: Record<string, CandidatesRow[]>;

  constructor() {
    this.candidates = {};
  }

  append(title: string, row: CandidatesRow) {
    if (!(title in this.candidates)) {
      this.candidates[title] = [];
    }
    this.candidates[title].push(row);
  }
}

export type AnswersRowData = {
  Timestamp: string;
  SecretCode: string;
  Email: string;
};

export class AnswersRow {
  Pos: number;
  Timestamp: string;
  SecretCode: string;
  Email: string;
  Data: Record<string, any>;

  constructor(pos: number, data: Partial<AnswersRow>) {
    this.Pos = pos;
    this.Timestamp = data.Timestamp || '';
    this.Email = data.Email || '';
    this.SecretCode = data['Secret code'] || '';
  }
}

export class Answers {
  @Type(() => AnswersRow)
  answers: Record<string, AnswersRow[]>;

  constructor() {
    this.answers = {};
  }

  append(title: string, row: AnswersRow) {
    if (!(title in this.answers)) {
      this.answers[title] = [];
    }
    this.answers[title].push(row);
  }
}

export class Calculators {
  @Type(() => Calculator)
  calculators: Record<string, Calculator[]>;

  @Type(() => QuestionsPool)
  questionsPools: Record<string, QuestionsPool>;
  @Type(() => Questions)
  questions: Record<string, Questions>;

  @Type(() => CandidatesPool)
  candidatesPools: Record<string, CandidatesPool>;
  @Type(() => Candidates)
  candidates: Record<string, Candidates>;

  @Type(() => Answers)
  answers: Record<string, Answers>;

  constructor() {
    this.calculators = {};
    this.questionsPools = {};
    this.questions = {};
    this.candidatesPools = {};
    this.candidates = {};
    this.answers = {};
  }

  appendCalculator(calculator: Calculator) {
    const key = calculator.key();
    if (!(key in this.calculators)) {
      this.calculators[key] = [];
    }
    this.calculators[key].push(calculator);
    console.log(this.stats());
  }

  getQuestionPool(url: CUrl): QuestionsPool | undefined {
    return this.questionsPools[url];
  }

  setQuestionsPool(url: CUrl, pool: QuestionsPool) {
    this.questionsPools[url] = pool;
  }

  getQuestions(url: CUrl): Questions | undefined {
    return this.questions[url];
  }

  setQuestions(url: CUrl, questions: Questions) {
    this.questions[url] = questions;
  }

  getCandidatesPool(url: CUrl): CandidatesPool | undefined {
    return this.candidatesPools[url];
  }

  setCandidatesPool(url: CUrl, pool: CandidatesPool) {
    this.candidatesPools[url] = pool;
  }

  getCandidates(url: CUrl): Candidates | undefined {
    return this.candidates[url];
  }

  setCandidates(url: CUrl, candidates: Candidates) {
    this.candidates[url] = candidates;
  }

  getAnswers(url: CUrl): Answers | undefined {
    return this.answers[url];
  }

  setAnswers(url: CUrl, candidates: Answers) {
    this.answers[url] = candidates;
  }

  stats(): Record<string, any> {
    return {
      calculatorsCount: this.calculators.length,
      questionsPoolsCount: this.questionsPools.size,
      // questionsCount: this.questions,
    };
  }
}
