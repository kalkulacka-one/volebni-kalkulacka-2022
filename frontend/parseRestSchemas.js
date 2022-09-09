/* eslint-disable no-undef */
const jsonParser = require('json-schema-to-typescript');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
// compile from file

const BASE_PATH = './src/types/rest';
const FILE_PATH = './public/dev/volebni-kalkulacka-004-openapi.json';
const REPLACE_PATTERN = '#/components/schemas/';
const SUFFIX = '.schema.json';

const resolver = {
  order: 1,

  canRead: true,
  async read(file, callback) {
    try {
      const localFile = file.url + SUFFIX;
      const dataString = await fs.promises
        .readFile(localFile)
        .then((data) => data.toString());
      console.info(`resolving ${path.parse(file.url).base}`);
      callback(null, dataString);
    } catch (e) {
      console.error(e);
      callback(new Error('No data!'));
    }
  },
};

function parse() {
  glob.glob(`${BASE_PATH}/*${SUFFIX}`, {}, function (er, files) {
    files.forEach((f) => {
      console.info(`parsing ${path.parse(f).base}`);
      const typePath = `${BASE_PATH}/${path
        .parse(f)
        .base.replace('.schema.json', '')}.d.ts`;
      jsonParser
        .compileFromFile(f, {
          $refOptions: {
            resolve: {
              http: resolver,
            },
          },
        })
        .then((ts) => {
          fs.writeFileSync(typePath, ts);
        });
    });
  });
}

fs.readFile(FILE_PATH, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const jsonData = JSON.parse(data.toString('utf-8'));
  Object.entries(jsonData.components.schemas).forEach((e) => {
    e[1].title += 'Rest';
    const jsonString = JSON.stringify(e[1]);
    const localFile = jsonString.replaceAll(REPLACE_PATTERN, ``);
    const schemaPath = `${BASE_PATH}/${e[0]}${SUFFIX}`;
    fs.writeFileSync(schemaPath, localFile);
  });
  parse();
});
