// import the necessary modules
import * as process from 'process';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import {
  type CUrl,
  type CalculatorRowData,
  Calculators,
  type QuestionsPoolRowData,
  QuestionsPool,
} from './types/input';

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
  const key = extractKey(url);
  console.log('Fetching GoogleSpreadsheet: ', url);
  const doc = new GoogleSpreadsheet(key, jwt);

  await doc.loadInfo(); // loads document properties and worksheets
  console.log('Fetched GoogleSpreadsheet: ', url, '; Title: ', doc.title);
  return doc;
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
    console.log('Pool: ', i, '; ', r.get('Uuid'));
    pool.append(r);
  }

  return pool;
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

    if (
      r.get('Election name') === undefined ||
      r.get('Questions pool') === undefined
    ) {
      // console.log('Skipping ', i, " - it's empty");
      continue;
    }

    console.log(
      'Calculator: ',
      i,
      ': ElectionName: ',
      r.get('Election name'),
      ', District Name: ',
      r.get('District name'),
      ', Questions pool: ',
      r.get('Questions pool'),
    );

    calculators.appendCalculator(r);
    const questionPoolUrl = r.get('Questions pool');
    if (calculators.shouldExtractQuestionPool(questionPoolUrl)) {
      const questionsPool = await extractQuestionPool(questionPoolUrl, jwt);

      calculators.setQuestionsPool(questionPoolUrl, questionsPool);
    }

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
