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
    electionName: row.get('Election name'),
    electionKey: row.get('Election key'),
    districtName: row.get('District name'),
    districtKey: row.get('District key'),
    name: row.get('Name'),
    description: row.get('Description'),
    showDescription: row.get('Show description'),
    round: row.get('Round'),
    variant: row.get('Variant'),
    electionFrom: row.get('Election from'),
    electionTo: row.get('Election to'),
    questionsPool: row.get('Questions pool'),
    questionsSpreadsheet: row.get('Questions spreadsheet'),
    questionsSheet: row.get('Questions sheet'),
    questionsForm: row.get('Questions form'),
    answerYes: row.get('Answer yes'),
    answerNo: row.get('Answer no'),
    answersSpreadsheetCandidates: row.get('Answers spreadsheet - candidates'),
    answersSheetCandidates: row.get('Answers sheet - candidates'),
    answersSpreadsheetExperts: row.get('Answers spreadsheet - experts'),
    answersSheetExperts: row.get('Answers sheet - experts'),
    candidatesPool: row.get('Candidates pool'),
    candidatesSheet: row.get('Candidates sheet'),
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
