import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import {
  type CUrl,
  type CalculatorRowData,
  Calculators,
  type QuestionsPoolRowData,
  QuestionsPool,
  Questions,
  type QuestionRowData,
  QuestionsRow,
  QuestionsPoolRow,
  CalculatorRow,
  CandidatesPoolRow,
  type CandidatesPoolRowData,
  CandidatesRow,
  type CandidatesRowData,
  DistrictsPoolRow,
  type DistrictsPoolRowData,
  DistrictsRow,
  type DistrictsRowData,
  AnswersRow,
} from './types/input';

// Function to convert GoogleSpreadsheetRow<QuestionsPoolRowData> to QuestionsPoolRow
export function convertToQuestionsPoolRow(
  pos: number,
  row: GoogleSpreadsheetRow<QuestionsPoolRowData>,
): QuestionsPoolRow {
  return new QuestionsPoolRow({
    Pos: pos,
    Uuid: row.get('Uuid'),
    Name: row.get('Name'),
    Question: row.get('Question'),
    Description: row.get('Description'),
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
  return new QuestionsRow({
    Pos: pos,
    Uuid: row.get('Uuid'),
    Name: row.get('Name'),
    Order: parseInt(row.get('Order')),
  });
}

export function convertToCalculatorRow(
  pos: number,
  row: GoogleSpreadsheetRow<CalculatorRowData>,
): CalculatorRow {
  return new CalculatorRow({
    Pos: pos,
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
    QuestionsSheetCandidates: row.get('Questions sheet - candidates'),
    QuestionsFormCandidates: row.get('Questions form - candidates'),
    QuestionsFormExperts: row.get('Questions form - experts'),
    L10nYes: row.get('L10n: yes'),
    L10nNo: row.get('L10n: no'),
    L10nIsImportant: row.get('L10n: is important'),
    L10nSecretCode: row.get('L10n: secret code'),
    L10nComment: row.get('L10n: comment'),
    AnswersSpreadsheetCandidates: row.get('Answers spreadsheet - candidates'),
    AnswersSheetCandidates: row.get('Answers sheet - candidates'),
    AnswersSpreadsheetExperts: row.get('Answers spreadsheet - experts'),
    AnswersSheetExperts: row.get('Answers sheet - experts'),
    CandidatesPool: row.get('Candidates pool'),
    CandidatesSpreadsheet: row.get('Candidates spreadsheet'),
    CandidatesSheet: row.get('Candidates sheet'),
    DistrictsPool: row.get('Districts pool'),
    DistrictsSpreadsheet: row.get('Districts spreadsheet'),
    DistrictsSheet: row.get('Districts sheet'),
  });
}

export function convertToCandidatesPoolRow(
  pos: number,
  row: GoogleSpreadsheetRow<CandidatesPoolRowData>,
): CandidatesPoolRow {
  return new CandidatesPoolRow({
    Pos: pos,
    Uuid: row.get('Uuid'),
    Name: row.get('Name'),
    Abbriviation: row.get('Abbriviation'),
    FirstName: row.get('First name'),
    LastName: row.get('Last name'),
    Type: row.get('Type'),
  });
}

export function convertToCandidatesRow(
  pos: number,
  row: GoogleSpreadsheetRow<CandidatesRowData>,
): CandidatesRow {
  return new CandidatesRow({
    Pos: pos,
    Uuid: row.get('Uuid'),
    Name: row.get('Name'),
    SecretCode: row.get('Secret code'),
    MemberOf: row.get('Member of'),
    Members: row.get('Members')?.split(),
  });
}

export function convertToDistrictsPoolRow(
  pos: number,
  row: GoogleSpreadsheetRow<DistrictsPoolRowData>,
): DistrictsPoolRow {
  return new DistrictsPoolRow({
    Pos: pos,
    Uuid: row.get('Uuid'),
    Name: row.get('Name'),
    Key: row.get('Key'),
    Description: row.get('Description'),
  });
}

export function convertToDistrictsRow(
  pos: number,
  row: GoogleSpreadsheetRow<DistrictsRowData>,
): DistrictsRow {
  return new DistrictsRow({
    Pos: pos,
    Uuid: row.get('Uuid'),
    Key: row.get('Key'),
  });
}

export function convertToAnswersRow(
  pos: number,
  row: GoogleSpreadsheetRow<Record<string, any>>,
): AnswersRow {
  return new AnswersRow({
    Pos: pos,
    Timestamp: row.get('Timestamp'),
    SecretCode: row.get('Secret code'),
    Email: row.get('E-mail'),
    Data: row.toObject(),
  });
}