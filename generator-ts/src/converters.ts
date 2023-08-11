import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import {
  type CUrl,
  type CalculatorRowData,
  Calculators,
  type QuestionsPoolRowData,
  QuestionsPool,
  Calculator,
  Questions,
  type QuestionRowData,
  QuestionsRow,
  QuestionsPoolRow,
  CalculatorRow,
  CandidatesPoolRow,
  type CandidatesPoolRowData,
  CandidatesRow,
  type CandidatesRowData,
} from './types/input';

// Function to convert GoogleSpreadsheetRow<QuestionsPoolRowData> to QuestionsPoolRow
export function convertToQuestionsPoolRow(
  pos: number,
  row: GoogleSpreadsheetRow<QuestionsPoolRowData>,
): QuestionsPoolRow {
  return new QuestionsPoolRow(pos, {
    Uuid: row.get('Uuid'),
    Name: row.get('Name'),
    Question: row.get('Question'),
    Descript: row.get('Descript'),
    Tags: row.get('Tags')?.split(),
    Note: row.get('Note'),
    Order: parseInt(row.get('Order')),
  });
}

// Function to convert GoogleSpreadsheetRow<QuestionsRowData> to QuestionsRow
export function convertToQuestionsRow(
  pos: number,
  row: GoogleSpreadsheetRow<QuestionsPoolRowData>,
): QuestionsRow {
  return new QuestionsRow(pos, {
    Uuid: row.get('Uuid'),
    Name: row.get('Name'),
    Order: parseInt(row.get('Order')),
  });
}

export function convertToCalculatorRow(
  row: GoogleSpreadsheetRow<CalculatorRowData>,
): CalculatorRow {
  return new CalculatorRow({
    ElectionName: row.get('Election name'),
    ElectionKey: row.get('Election key'),
    DistrictName: row.get('District name'),
    DistrictKey: row.get('District key'),
    Name: row.get('Name'),
    Description: row.get('Description'),
    ShowDescription: row.get('Show description'),
    Round: row.get('Round'),
    Variant: row.get('Variant'),
    ElectionFrom: row.get('Election from'),
    ElectionTo: row.get('Election to'),
    QuestionsPool: row.get('Questions pool'),
    QuestionsSpreadsheet: row.get('Questions spreadsheet'),
    QuestionsSheet: row.get('Questions sheet'),
    QuestionsForm: row.get('Questions form'),
    AnswerYes: row.get('Answer yes'),
    AnswerNo: row.get('Answer no'),
    AnswersSpreadsheetCandidates: row.get('Answers spreadsheet - candidates'),
    AnswersSheetCandidates: row.get('Answers sheet - candidates'),
    AnswersSpreadsheetExperts: row.get('Answers spreadsheet - experts'),
    AnswersSheetExperts: row.get('Answers sheet - experts'),
    CandidatesPool: row.get('Candidates pool'),
    CandidatesSpreadsheet: row.get('Candidates spreadsheet'),
    CandidatesSheet: row.get('Candidates sheet'),
  });
}

export function convertToCandidatesPoolRow(
  row: GoogleSpreadsheetRow<CandidatesPoolRowData>,
): CandidatesPoolRow {
  return new CandidatesPoolRow({
    Uuid: row.get('Uuid'),
    Name: row.get('Name'),
    Abbriviation: row.get('Abbriviation'),
    FirstName: row.get('First name'),
    LastName: row.get('Last name'),
    Type: row.get('Type'),
  });
}

export function convertToCandidatesRow(
  row: GoogleSpreadsheetRow<CandidatesRowData>,
): CandidatesRow {
  return new CandidatesRow({
    Uuid: row.get('Uuid'),
    Name: row.get('Name'),
    SecretCode: row.get('Secret code'),
    MemberOf: row.get('Member of'),
    Members: row.get('Members'),
  });
}
