// import the necessary modules
import * as process from 'process';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
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
  type CandidatesPoolRowData,
  CandidatesPool,
} from './types/input';

import {
  convertToQuestionsPoolRow,
  convertToQuestionsRow,
  convertToCalculatorRow,
  convertToCandidatesPoolRow,
} from './converters';

function isEmpty(val: string | undefined): boolean {
  return (val || '').trim().length === 0;
}

// Function to get the value of an environmental variable or a default value
function getEnvOrDefault(envVariable: string, defaultValue: string): string {
  return process.env[envVariable] || defaultValue;
}

// Function to parse command-line arguments
function parseCommandLineArgs(): { name: string; age: number } {
  const nameArgIndex = process.argv.indexOf('--name');
  const ageArgIndex = process.argv.indexOf('--age');

  const name = nameArgIndex !== -1 ? process.argv[nameArgIndex + 1] : '';
  const age =
    ageArgIndex !== -1 ? parseInt(process.argv[ageArgIndex + 1]) : NaN;

  return { name, age };
}

async function fetchGoogleSpreadsheet(
  url: CUrl,
  jwt: JWT,
): Promise<GoogleSpreadsheet> {
  console.log('Fetching GoogleSpreadsheet: ', url);
  const key = extractKey(url);
  const doc = new GoogleSpreadsheet(key, jwt);

  await doc.loadInfo(); // loads document properties and worksheets
  console.log('Fetched GoogleSpreadsheet: ', url, '; Title: ', doc.title);
  return doc;
}

function skipQuestionRowData(
  row: GoogleSpreadsheetRow<QuestionRowData>,
): boolean {
  return isEmpty(row.get('Uuid')) || isEmpty(row.get('Name'));
}

async function extractQuestions(url: CUrl, jwt: JWT): Promise<Questions> {
  const questions = new Questions();
  const doc = await fetchGoogleSpreadsheet(url, jwt);

  for (let sI = 0; sI < doc.sheetCount; sI++) {
    const sheet = doc.sheetsByIndex[sI];
    await sheet.loadHeaderRow();
    const title = sheet.title;

    const questionRows = await sheet.getRows<QuestionRowData>();
    for (let i = 0; i < questionRows.length; i++) {
      const r = questionRows[i];
      if (skipQuestionRowData(r)) {
        console.log('Skipping QuestionRowData: ', i);
        continue;
      }
      console.log('Question: ', title, '/', i, '; ', r.get('Uuid'));
      questions.append(title, convertToQuestionsRow(i, r));
    }
  }

  return questions;
}

function skipQuestionsPoolRowData(
  row: GoogleSpreadsheetRow<QuestionsPoolRowData>,
): boolean {
  return isEmpty(row.get('Uuid')) || isEmpty(row.get('Name'));
}

async function extractQuestionPool(
  url: CUrl,
  jwt: JWT,
): Promise<QuestionsPool> {
  const pool = new QuestionsPool();
  const doc = await fetchGoogleSpreadsheet(url, jwt);

  const sheet = doc.sheetsByTitle['Questions'];
  await sheet.loadHeaderRow();

  const poolRows = await sheet.getRows<QuestionsPoolRowData>();
  for (let i = 0; i < poolRows.length; i++) {
    const r = poolRows[i];
    if (skipQuestionsPoolRowData(r)) {
      console.log('Skipping QuestionsPoolRowData: ', i);
      continue;
    }
    console.log('QuestionPool: ', i, '; ', r.get('Uuid'));
    pool.append(convertToQuestionsPoolRow(i, r));
  }

  return pool;
}

function skipCandidatesPoolRowData(
  row: GoogleSpreadsheetRow<CandidatesPoolRowData>,
): boolean {
  return isEmpty(row.get('Uuid')) || isEmpty(row.get('Name'));
}

async function extractCandidatesPool(
  url: CUrl,
  jwt: JWT,
): Promise<CandidatesPool> {
  const pool = new CandidatesPool();
  const doc = await fetchGoogleSpreadsheet(url, jwt);

  const sheet = doc.sheetsByTitle['Candidates'];
  await sheet.loadHeaderRow();

  const poolRows = await sheet.getRows<CandidatesPoolRowData>();
  for (let i = 0; i < poolRows.length; i++) {
    const r = poolRows[i];
    if (skipCandidatesPoolRowData(r)) {
      console.log('Skipping CandidatesPoolRowData: ', i);
      continue;
    }
    console.log('CandidatesPool: ', i, '; ', r.get('Uuid'));
    pool.append(convertToCandidatesPoolRow(r));
  }

  return pool;
}

function skipCalculatorRowData(
  row: GoogleSpreadsheetRow<CalculatorRowData>,
): boolean {
  return (
    isEmpty(row.get('Election name')) ||
    isEmpty(row.get('Questions pool')) ||
    isEmpty(row.get('Questions spreadsheet')) ||
    isEmpty(row.get('Questions sheet')) ||
    isEmpty(row.get('Candidates pool'))
  );
}

async function extractCalculators(url: CUrl, jwt: JWT): Promise<Calculators> {
  console.log('Extracting calculators from: ', url);
  const doc = await fetchGoogleSpreadsheet(url, jwt);

  let calculators = new Calculators();

  const sheet = doc.sheetsByTitle['Questions'];
  await sheet.loadHeaderRow();

  const calculatorRows = await sheet.getRows<CalculatorRowData>();
  for (let i = 0; i < calculatorRows.length; i++) {
    const r = calculatorRows[i];

    if (skipCalculatorRowData(r)) {
      console.log('Skipping CalculatorRowData: ', i);
      continue;
    }

    console.log(
      'Calculator: ',
      i,
      ': ElectionName: ',
      r.get('Election name'),
      ', District Name: ',
      r.get('District name'),
    );

    const questionPoolUrl = r.get('Questions pool');
    let questionsPool = calculators.getQuestionPool(questionPoolUrl);
    if (questionsPool === undefined) {
      questionsPool = await extractQuestionPool(questionPoolUrl, jwt);
      calculators.setQuestionsPool(questionPoolUrl, questionsPool);
    }

    const questionsUrl = r.get('Questions spreadsheet');
    let questions = calculators.getQuestions(questionsUrl);
    if (questions === undefined) {
      questions = await extractQuestions(questionsUrl, jwt);
      calculators.setQuestions(questionPoolUrl, questions);
    }

    const candidatesPoolUrl = r.get('Candidates pool');
    let candidatesPool = calculators.getCandidatesPool(candidatesPoolUrl);
    if (candidatesPool === undefined) {
      candidatesPool = await extractCandidatesPool(candidatesPoolUrl, jwt);
      calculators.setCandidatesPool(candidatesPoolUrl, candidatesPool);
    }

    const calculator = new Calculator(
      convertToCalculatorRow(r),
      questionsPool,
      questions,
      candidatesPool,
    );

    calculators.appendCalculator(calculator);

    // console.log(calculatorRows[i]);
  }

  return calculators;
}

// Main function
function main() {
  // Parse command-line arguments
  // const { name: nameFromArgs, age: ageFromArgs } = parseCommandLineArgs();

  // // Get values from environmental variables or set default values
  // const nameFromEnv = getEnvOrDefault('NAME', 'Default Name');
  // const ageFromEnv = parseInt(getEnvOrDefault('AGE', '0'));

  // // Display the values
  // console.log('Name from args:', nameFromArgs);
  // console.log('Age from args:', ageFromArgs);
  // console.log('Name from environmental variable:', nameFromEnv);
  // console.log('Age from environmental variable:', ageFromEnv);

  const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
  ];

  const jwtFromEnv = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: SCOPES,
  });

  (async function () {
    const calculators = await extractCalculators(
      'https://docs.google.com/spreadsheets/d/1rEtloBTzS_fZyeIX9wYYW32Pg2NeJNYj6oQbyIyTTvw/view#gid=0',
      jwtFromEnv,
    );
  })();
}

// Call the main function
main();

function extractKey(url: CUrl): string | undefined {
  const regex = /.*\/d\/([a-zA-Z0-9_-]+)\/?.*/;
  const match = url.match(regex);

  // console.log('URL: ', url, '; Match: ', match);
  // console.log(match);

  if (match && match[1]) {
    return match[1];
  } else {
    return undefined;
  }
}
