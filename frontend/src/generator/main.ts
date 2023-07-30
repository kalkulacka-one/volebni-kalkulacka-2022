// import the necessary modules
import * as process from 'process';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

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

type CBool = 'Yes' | 'No';
type CKey = string;
type CUrl = string;
type CDateTime = string;
type CSheetName = string;

type CalculatorRowData = {
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
};

type QuestionRowData = {
  Uuid: string;
  Name: string;
  Question: string;
};

class QuestionsPool {
  questions: { [key: string]: QuestionRowData } = {};
}

class QuestionsRepository {
  pool: { [key: string]: QuestionsPool } = {};
}

async function extractCalculators(doc: GoogleSpreadsheet) {
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  const sheet = doc.sheetsByTitle['Questions'];
  await sheet.loadHeaderRow();

  const calculatorRows = await sheet.getRows<CalculatorRowData>();
  for (let i = 0; i < calculatorRows.length; i++) {
    const r = calculatorRows[i];
    console.log(
      i,
      ': ElectionName: ',
      r.get('Election name'),
      ', District Name: ',
      r.get('District name')
    );
    // console.log(calculatorRows[i]);
  }
}

// Main function
function main() {
  // Parse command-line arguments
  const { name: nameFromArgs, age: ageFromArgs } = parseCommandLineArgs();

  // Get values from environmental variables or set default values
  const nameFromEnv = getEnvOrDefault('NAME', 'Default Name');
  const ageFromEnv = parseInt(getEnvOrDefault('AGE', '0'));

  // Display the values
  console.log('Name from args:', nameFromArgs);
  console.log('Age from args:', ageFromArgs);
  console.log('Name from environmental variable:', nameFromEnv);
  console.log('Age from environmental variable:', ageFromEnv);

  const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
  ];

  const jwtFromEnv = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: SCOPES,
  });

  const doc = new GoogleSpreadsheet(
    '1rEtloBTzS_fZyeIX9wYYW32Pg2NeJNYj6oQbyIyTTvw',
    jwtFromEnv
  );

  (async function () {
    const calculators = await extractCalculators(doc);
  })();
}

// Call the main function
main();
