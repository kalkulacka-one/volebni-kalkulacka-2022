/* eslint-disable no-undef */
const jsonParser = require('json-schema-to-typescript');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
// compile from file

const myResolver = {
  order: 1,

  canRead: true,
  async read(file, callback) {
    try {
      const localFile = file.url.replace(
        'https://kalkulacka.ceskodigital.net/schemas/',
        '../schemas/'
      );
      const dataString = await fs.promises
        .readFile(localFile)
        .then((data) => data.toString());
      callback(null, dataString);
    } catch {
      callback(new Error('No data!'));
    }
  },
};

//const schemas = fs.readdirSync("../schemas/");
glob.glob('../schemas/*.json', {}, function (er, files) {
  files.forEach((f) => {
    const typePath = `./src/types/${path
      .parse(f)
      .base.replace('.schema.json', '')}.d.ts`;
    jsonParser
      .compileFromFile(f, {
        $refOptions: {
          resolve: {
            http: myResolver,
          },
        },
      })
      .then((ts) => {
        fs.writeFileSync(typePath, ts);
      });
  });
});
