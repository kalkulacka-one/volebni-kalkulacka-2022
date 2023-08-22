# volebni-kalkulacka-2022-generator

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

## Project Setup

```sh
npm install
```

### Setup Environmental Variables

It expects that the environmental variables - `GOOGLE_PRIVATE_KEY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_APPLICATION_CREDENTIALS` are populated. Instructions for how to obtain
these values are described in the [library documentation](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=service-account).

```sh
export GOOGLE_PRIVATE_KEY=$(jq .private_key service_account.json | sed -r 's/\\n/\\\n/g;s/\\//g;s/"//g');
export GOOGLE_SERVICE_ACCOUNT_EMAIL=$(jq .client_email service_account.json | sed -r 's/\\n/\\\n/g;s/\\//g;s/"//g');
export GOOGLE_APPLICATION_CREDENTIALS=$(realpath service_account.json);
```

### Run Script

```sh
npm run generate
```

## Workflow

1. Create form similar to the - https://docs.google.com/spreadsheets/d/1rEtloBTzS_fZyeIX9wYYW32Pg2NeJNYj6oQbyIyTTvw/edit?usp=sharing
2. Keep columns - `Questions form - candidates` and `Questions form - experts` empty.
3. Run the script for generating the data - `npm run generate -- --calculators-url "https://docs.google.com/spreadsheets/d/1rEtloBTzS_fZyeIX9wYYW32Pg2NeJNYj6oQbyIyTTvw/"`
4. It will give you forms' URLs for candidates and experts.
5. Update corresponding cells with those values.
6. Send forms to the candidates
7. Run the same script as in 3) to update the resul files.

## Spreadsheet Description

### Calculators Spreadsheet

Example: https://docs.google.com/spreadsheets/d/1rEtloBTzS_fZyeIX9wYYW32Pg2NeJNYj6oQbyIyTTvw/

## Other Useful Commands

### Development - compile

Compile with `--watch` to speed up development:

```sh
npm run dev:compile
```

### Development - run

Run the compiled version:

```sh
npm run dev:generate
```

### Development - run in a loop

Run the script every 15s:

```sh
npm run dev:generate-loop
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Lint and fix:

```sh
npm run lint:fix
```

### Prettify other files

```sh
npx prettier --check .
```

Check and fix:

```sh
npx prettier --write .
```
