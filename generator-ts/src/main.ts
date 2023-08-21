// import the necessary modules
import * as process from 'process';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { forms_v1, google } from 'googleapis';
import { JWT } from 'google-auth-library';
import 'reflect-metadata';
import * as path from 'path';
import * as fs from 'fs';
import {
  instanceToPlain,
  Type,
  deserialize,
  instanceToInstance,
  plainToClass,
} from 'class-transformer';

import {
  type CUrl,
  type CalculatorRowData,
  Calculators,
  type QuestionsPoolRowData,
  QuestionsPool,
  // Calculator,
  Questions,
  type QuestionRowData,
  type CandidatesPoolRowData,
  CandidatesPool,
  type CandidatesRowData,
  CandidatesRow,
  Candidates,
  type DistrictsPoolRowData,
  DistrictsPool,
  type DistrictsRowData,
  DistrictsRow,
  Districts,
  type AnswersRowData,
  Answers,
  AnswersRow,
  CalculatorRow,
  QuestionsRow,
  QuestionsPoolRow,
} from './types/input';

import {
  convertToQuestionsPoolRow,
  convertToQuestionsRow,
  convertToCalculatorRow,
  convertToCandidatesPoolRow,
  convertToCandidatesRow,
  convertToDistrictsPoolRow,
  convertToDistrictsRow,
  convertToAnswersRow,
} from './converters';

import { isEmptyColumn, isEmptyValue } from './utils';

// Function to get the value of an environmental variable or a default value
function getEnvOrDefault(envVariable: string, defaultValue: string): string {
  return process.env[envVariable] || defaultValue;
}

const DEFAULT_CACHE_LIFETIME = 1e10;
const DEFAULT_CACHE_DIR = path.join(__dirname, '.cache');

// Function to parse command-line arguments
function parseCommandLineArgs(): { cacheLifetime: number; cacheDir: string } {
  const cacheLifetimeArgIndex = process.argv.indexOf('--cache-lifetime');
  const cacheDirArgIndex = process.argv.indexOf('--cache-dir');

  const cacheLifetime =
    cacheLifetimeArgIndex !== -1
      ? parseInt(process.argv[cacheLifetimeArgIndex + 1])
      : DEFAULT_CACHE_LIFETIME;
  const cacheDir =
    cacheDirArgIndex !== -1
      ? process.argv[cacheDirArgIndex + 1]
      : DEFAULT_CACHE_DIR;

  return { cacheLifetime, cacheDir };
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
  return (
    isEmptyColumn<QuestionRowData>(row, 'Uuid') ||
    isEmptyColumn<QuestionRowData>(row, 'Name')
  );
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
      console.log(
        'Question: ',
        title,
        '/',
        i,
        '; ',
        r.get('Name'),
        '; ',
        r.get('Uuid'),
      );
      questions.append(title, convertToQuestionsRow(i, r));
    }
  }

  return questions;
}

function skipQuestionsPoolRowData(
  row: GoogleSpreadsheetRow<QuestionsPoolRowData>,
): boolean {
  return (
    isEmptyColumn<QuestionsPoolRowData>(row, 'Uuid') ||
    isEmptyColumn<QuestionsPoolRowData>(row, 'Name')
  );
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
    console.log('QuestionPool: ', i, '; ', r.get('Name'), '; ', r.get('Uuid'));
    pool.append(convertToQuestionsPoolRow(i, r));
  }

  return pool;
}

function skipCandidatesPoolRowData(
  row: GoogleSpreadsheetRow<CandidatesPoolRowData>,
): boolean {
  return (
    isEmptyColumn<CandidatesPoolRowData>(row, 'Uuid') ||
    isEmptyColumn<CandidatesPoolRowData>(row, 'Name')
  );
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
    console.log(
      'CandidatesPool: ',
      i,
      '; ',
      r.get('Name'),
      '; ',
      r.get('Uuid'),
    );
    pool.append(convertToCandidatesPoolRow(i, r));
  }

  return pool;
}

function skipCandidatesRowData(
  row: GoogleSpreadsheetRow<CandidatesRowData>,
): boolean {
  return (
    isEmptyColumn<CandidatesRowData>(row, 'Uuid') ||
    isEmptyColumn<CandidatesRowData>(row, 'Name')
  );
}

async function extractCandidates(url: CUrl, jwt: JWT): Promise<Candidates> {
  const candidates = new Candidates();
  const doc = await fetchGoogleSpreadsheet(url, jwt);

  for (let sI = 0; sI < doc.sheetCount; sI++) {
    const sheet = doc.sheetsByIndex[sI];
    await sheet.loadHeaderRow();
    const title = sheet.title;

    const candidatesRows = await sheet.getRows<CandidatesRowData>();
    for (let i = 0; i < candidatesRows.length; i++) {
      const r = candidatesRows[i];
      if (skipCandidatesRowData(r)) {
        console.log('Skipping CandidatesRowData: ', i);
        continue;
      }
      console.log(
        'Candidates: ',
        title,
        '/',
        i,
        '; ',
        r.get('Name'),
        '; ',
        r.get('Uuid'),
      );
      candidates.append(title, convertToCandidatesRow(i, r));
    }
  }

  return candidates;
}

function skipDistrictsPoolRowData(
  row: GoogleSpreadsheetRow<DistrictsPoolRowData>,
): boolean {
  return (
    isEmptyColumn<DistrictsPoolRowData>(row, 'Uuid') ||
    isEmptyColumn<DistrictsPoolRowData>(row, 'Name')
  );
}

async function extractDistrictsPool(
  url: CUrl,
  jwt: JWT,
): Promise<DistrictsPool> {
  const pool = new DistrictsPool();
  const doc = await fetchGoogleSpreadsheet(url, jwt);

  const sheet = doc.sheetsByTitle['Districts'];
  await sheet.loadHeaderRow();

  const poolRows = await sheet.getRows<DistrictsPoolRowData>();
  for (let i = 0; i < poolRows.length; i++) {
    const r = poolRows[i];
    if (skipDistrictsPoolRowData(r)) {
      console.log('Skipping DistrictsPoolRowData: ', i);
      continue;
    }
    console.log('DistrictsPool: ', i, '; ', r.get('Key'), '; ', r.get('Uuid'));
    pool.append(convertToDistrictsPoolRow(i, r));
  }

  return pool;
}

function skipDistrictsRowData(
  row: GoogleSpreadsheetRow<DistrictsRowData>,
): boolean {
  return (
    isEmptyColumn<DistrictsRowData>(row, 'Uuid') ||
    isEmptyColumn<DistrictsRowData>(row, 'Key')
  );
}

async function extractDistricts(url: CUrl, jwt: JWT): Promise<Districts> {
  const districts = new Districts();
  const doc = await fetchGoogleSpreadsheet(url, jwt);

  for (let sI = 0; sI < doc.sheetCount; sI++) {
    const sheet = doc.sheetsByIndex[sI];
    await sheet.loadHeaderRow();
    const title = sheet.title;

    const districtsRows = await sheet.getRows<DistrictsRowData>();
    for (let i = 0; i < districtsRows.length; i++) {
      const r = districtsRows[i];
      if (skipDistrictsRowData(r)) {
        console.log('Skipping DistrictsRowData: ', i);
        continue;
      }
      console.log(
        'Districts: ',
        title,
        '/',
        i,
        '; ',
        r.get('Key'),
        '; ',
        r.get('Uuid'),
      );
      districts.append(title, convertToDistrictsRow(i, r));
    }
  }

  return districts;
}

function skipAnswersRowData(
  row: GoogleSpreadsheetRow<Partial<AnswersRowData>>,
): boolean {
  return isEmptyColumn<AnswersRowData>(row, 'Secret code');
}

async function extractAnswers(url: CUrl, jwt: JWT): Promise<Answers> {
  const answers = new Answers();
  const doc = await fetchGoogleSpreadsheet(url, jwt);

  for (let sI = 0; sI < doc.sheetCount; sI++) {
    const sheet = doc.sheetsByIndex[sI];
    await sheet.loadHeaderRow();
    const title = sheet.title;

    const answersRows = await sheet.getRows<Partial<AnswersRowData>>();
    for (let i = 0; i < answersRows.length; i++) {
      const r = answersRows[i];
      if (skipAnswersRowData(r)) {
        console.log('Skipping CandidatesRowData: ', i);
        continue;
      }
      console.log(
        'Answers: ',
        title,
        '/',
        i,
        '; ',
        r.get('Secret code'),
        '; ',
        r.get('Email'),
      );
      answers.append(title, convertToAnswersRow(i, r));
    }
  }

  return answers;
}

function skipCalculatorRowData(
  row: GoogleSpreadsheetRow<CalculatorRowData>,
): boolean {
  return (
    isEmptyColumn<CalculatorRowData>(row, 'Election name') ||
    isEmptyColumn<CalculatorRowData>(row, 'Questions pool') ||
    isEmptyColumn<CalculatorRowData>(row, 'Questions spreadsheet') ||
    isEmptyColumn<CalculatorRowData>(row, 'Questions sheet') ||
    isEmptyColumn<CalculatorRowData>(row, 'Candidates pool') ||
    isEmptyColumn<CalculatorRowData>(row, 'Candidates spreadsheet') ||
    isEmptyColumn<CalculatorRowData>(row, 'Candidates sheet') ||
    isEmptyColumn<CalculatorRowData>(row, 'Districts pool') ||
    isEmptyColumn<CalculatorRowData>(row, 'Districts spreadsheet') ||
    isEmptyColumn<CalculatorRowData>(row, 'Districts sheet')
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
      calculators.setQuestions(questionsUrl, questions);
    }

    const candidatesPoolUrl = r.get('Candidates pool');
    let candidatesPool = calculators.getCandidatesPool(candidatesPoolUrl);
    if (candidatesPool === undefined) {
      candidatesPool = await extractCandidatesPool(candidatesPoolUrl, jwt);
      calculators.setCandidatesPool(candidatesPoolUrl, candidatesPool);
    }

    const candidatesUrl = r.get('Candidates spreadsheet');
    let candidates = calculators.getCandidates(candidatesUrl);
    if (candidates === undefined) {
      candidates = await extractCandidates(candidatesUrl, jwt);
      calculators.setCandidates(candidatesUrl, candidates);
    }

    const districtsPoolUrl = r.get('Districts pool');
    let districtsPool = calculators.getDistrictsPool(districtsPoolUrl);
    if (districtsPool === undefined) {
      districtsPool = await extractDistrictsPool(districtsPoolUrl, jwt);
      calculators.setDistrictsPool(districtsPoolUrl, districtsPool);
    }

    const districtsUrl = r.get('Districts spreadsheet');
    let districts = calculators.getDistricts(districtsUrl);
    if (districts === undefined) {
      districts = await extractDistricts(districtsUrl, jwt);
      calculators.setDistricts(districtsUrl, districts);
    }

    const answersCandidatesUrl = r.get('Answers spreadsheet - candidates');
    const answersCandidatesSheet = r.get('Answers sheet - candidates');
    let answersCandidates = calculators.getAnswers(answersCandidatesUrl);
    if (
      answersCandidates === undefined &&
      !isEmptyColumn(r, 'Answers spreadsheet - candidates')
    ) {
      answersCandidates = await extractAnswers(answersCandidatesUrl, jwt);
      calculators.setAnswers(answersCandidatesUrl, answersCandidates);
    }

    const answersExpertsUrl = r.get('Answers spreadsheet - experts');
    const answersExpertsSheet = r.get('Answers sheet - experts');
    let answersExperts = calculators.getAnswers(answersExpertsUrl);
    if (
      answersExperts === undefined &&
      !isEmptyColumn(r, 'Answers spreadsheet - experts')
    ) {
      answersExperts = await extractAnswers(answersExpertsUrl, jwt);
      calculators.setAnswers(answersExpertsUrl, answersExperts);
    }

    calculators.appendCalculator(convertToCalculatorRow(i, r));

    // console.log(calculatorRows[i]);
  }

  return calculators;
}

// Main function
function main() {
  // Parse command-line arguments
  const { cacheLifetime, cacheDir } = parseCommandLineArgs();

  console.log('Cache Lifetime:', cacheLifetime);
  console.log('Cache Dir:', cacheDir);

  const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/forms',
  ];

  const jwtFromEnv = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: SCOPES,
  });

  const calculatorsUrl =
    'https://docs.google.com/spreadsheets/d/1rEtloBTzS_fZyeIX9wYYW32Pg2NeJNYj6oQbyIyTTvw/view#gid=0';
  const calculatorsKey = extractKey(calculatorsUrl);
  console.log(
    'Processing calculators from: ',
    calculatorsKey,
    ' (',
    calculatorsUrl,
    ')',
  );

  (async function () {
    let fetchData = false;
    const cacheFile = path.join(cacheDir, calculatorsKey + '.json');

    console.log('Using cache file: ', cacheFile);
    try {
      const cacheStats = fs.statSync(cacheFile);
      new Date().getTime();
      if (cacheStats.mtimeMs + cacheLifetime * 1e6 < new Date().getTime()) {
        console.log(
          'Cache file is too old: ',
          cacheStats.mtime,
          ' refetching data',
        );
        fetchData = true;
      }
    } catch (error) {
      console.log('Cannot read input file: ', error);
      fetchData = true;
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    let calculators = new Calculators();
    if (fetchData) {
      calculators = await extractCalculators(calculatorsUrl, jwtFromEnv);

      let calculatorsJson = JSON.stringify(
        instanceToPlain(calculators),
        null,
        2,
      );
      try {
        fs.writeFileSync(cacheFile, calculatorsJson, 'utf-8');
        console.log('Calculators were cached in: ', cacheFile);
      } catch (writeError) {
        console.error('Error writing to file:', writeError);
        throw writeError;
      }
    } else {
      try {
        const data = fs.readFileSync(cacheFile, 'utf8');
        try {
          const jsonData = JSON.parse(data);
          calculators = plainToClass(Calculators, jsonData);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          throw parseError;
        }
      } catch (readError) {
        console.error('Error while reading file: ', readError);
        throw readError;
      }
      instanceToInstance;
    }

    console.log('Calculators stats: ', calculators.stats());

    const googleForms = initGoogleForms();

    for (const calculator of calculators.calculators) {
      console.log(calculator.Pos + ': ' + calculator.key());
      if (!calculator.hasForms()) {
        const questions = constructQuestions(
          calculator,
          calculators.getQuestionPool(calculator.QuestionsPool),
          calculators.getQuestions(calculator.QuestionsSpreadsheet).questions[
            calculator.QuestionsSheet
          ],
        );

        if (isEmptyValue(calculator.QuestionsFormCandidates)) {
          const form = await createForm(
            googleForms,
            calculator,
            questions,
            'candidate',
          );

          console.log(
            `Form: https://docs.google.com/forms/d/${form.formId}; Sheet: ${form.linkedSheetId}`,
          );
          throw new Error('Just testing');
        }

        console.log(questions);
      }
    }
  })();
}

// Call the main function
main();

function initGoogleForms() {
  const auth = new google.auth.GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/forms',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  const googleForms = google.forms({
    version: 'v1',
    auth,
  });
  return googleForms;
}

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
function constructQuestions(
  calculator: CalculatorRow,
  pool: QuestionsPool,
  questions: QuestionsRow[],
): QuestionsPoolRow[] {
  if (questions === undefined) {
    console.error(calculator);
    throw new Error(`No questions for calculator on row: ${calculator.Pos}`);
  }

  const res = new Array<QuestionsPoolRow>(questions.length);

  const used = new Set<string>();

  // 1. set the questions to their Order
  for (const q of questions) {
    if (q.Order !== undefined && q.Order >= 1 && q.Order <= questions.length) {
      const index = q.Order - 1;
      if (res[index] === undefined) {
        res[index] = pool.questions[q.Uuid];
        used.add(q.Uuid);
      }
    }
  }

  // 2. Fill the remaining positions based on their position
  if (used.size != questions.length) {
    let usePos = 0;
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      console.log(`${q.Uuid}: ${q.Uuid in used}; ${used.has(q.Uuid)}`);
      if (!used.has(q.Uuid)) {
        while (res[usePos] !== undefined && usePos < questions.length) {
          usePos++;
          console.log(usePos);
        }
        res[usePos] = pool.questions[q.Uuid];
        used.add(q.Uuid);
      }
    }
  }

  if (used.size != res.length || res.length != questions.length) {
    console.log(res);
    throw new Error(
      `Function not implemented properly - used: ${used.size}; res: ${res.length}; questions: ${questions.length}.`,
    );
  }

  return res;
}

// https://developers.google.com/forms/api/reference/rest
async function createForm(
  googleForms: forms_v1.Forms,
  calculator: CalculatorRow,
  questions: QuestionsPoolRow[],
  type: 'candidate' | 'expert',
): Promise<forms_v1.Schema$Form> {
  const title = `${calculator.ElectionName} - ${calculator.DistrictName} - ${calculator.Round} - ${calculator.Variant} - ${type}`;
  // https://developers.google.com/forms/api/reference/rest/v1/forms/create
  // https://developers.google.com/forms/api/reference/rest/v1/forms#resource:-form
  const formC = await googleForms.forms.create({
    requestBody: {
      info: {
        title: title,
        // description: `${title} - ${calculator.Description}`,
      },
    },
  });

  console.log(`${title} - ${formC.data.formId}`);

  if (formC.status != 200) {
    throw new Error(
      `Calculator: ${calculator.Pos} - ${formC.status}: ${formC.statusText}`,
    );
  }

  // https://developers.google.com/forms/api/reference/rest/v1/forms/batchUpdate#http-request
  const formU = await googleForms.forms.batchUpdate({
    formId: formC.data.formId,
    requestBody: {
      includeFormInResponse: true,
      requests: createFormQuestions(calculator, questions).map(
        (item: forms_v1.Schema$Item, index: number) => {
          return {
            createItem: {
              item: item,
              location: {
                index: index,
              },
            },
          };
        },
      ),
    },
  });

  if (formU.status != 200) {
    throw new Error(
      `Calculator: ${calculator.Pos} - ${formU.status}: ${formU.statusText}`,
    );
  }

  //items: createFormQuestions(calculator, questions),

  return formU.data.form;
}

function createFormQuestions(
  calculator: CalculatorRow,
  questions: QuestionsPoolRow[],
): forms_v1.Schema$Item[] {
  const res = Array<forms_v1.Schema$Item>();

  res.push({
    title: 'E-mail',
    questionItem: {
      question: {
        required: true,
        textQuestion: {
          paragraph: false,
        },
      },
    },
  });

  res.push({
    title: `${calculator.L10nSecretCode}`,
    questionItem: {
      question: {
        required: true,
        textQuestion: {
          paragraph: false,
        },
      },
    },
  });

  for (let i = 0; i < questions.length; i++) {
    const row = questions[i];
    // https://developers.google.com/forms/api/reference/rest/v1/forms#item
    res.push({
      title: `${i}. ${row.Question}`,
      description: row.Description,
      questionItem: {
        question: {
          required: false,
          choiceQuestion: {
            type: 'RADIO',
            options: [
              {
                value: calculator.L10nYes,
              },
              {
                value: calculator.L10nNo,
              },
            ],
          },
        },
      },
    });

    res.push({
      title: `${i}. ${calculator.L10nComment}`,
      // description: row.Description,
      questionItem: {
        question: {
          required: false,
          textQuestion: {
            paragraph: true,
          },
        },
      },
    });

    res.push({
      title: `${i}. ${calculator.L10nIsImportant}`,
      // description: row.Description,
      questionItem: {
        question: {
          required: false,
          choiceQuestion: {
            type: 'RADIO',
            options: [
              {
                value: calculator.L10nYes,
              },
              {
                value: calculator.L10nNo,
              },
            ],
          },
        },
      },
    });
  }

  return res;
}
