// import the necessary modules
import * as process from 'process';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { type CUrl, type CalculatorRowData, Calculators } from './types/input';

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

async function extractCalculators(
  doc: GoogleSpreadsheet,
): Promise<Calculators> {
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

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
      console.log('Skipping ', i, " - it's empty");
      continue;
    }

    const poolKey = extractKey(r.get('Questions pool'));

    console.log(
      i,
      ': ElectionName: ',
      r.get('Election name'),
      ', District Name: ',
      r.get('District name'),
      ', Pool Key: ',
      poolKey,
    );

    // console.log(calculatorRows[i]);
  }

  return calculators;
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
    jwtFromEnv,
  );

  (async function () {
    const calculators = await extractCalculators(doc);
  })();
}

// Call the main function
main();

function extractKey(url: CUrl): string | undefined {
  const regex = /.*\/d\/([a-zA-Z0-9_-]+)\/.*/;
  const match = url.match(regex);

  console.log('URL: ', url, '; Match: ', match);
  console.log(match);

  if (match && match[1]) {
    return match[1];
  } else {
    return undefined;
  }
}
