# volebni-kalkulacka-2022-generator

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

## Project Setup

```sh
npm install
```

### Setup Environmental Variables

It expects that the environmental variables - `GOOGLE_PRIVATE_KEY` and `GOOGLE_SERVICE_ACCOUNT_EMAIL` are populated. Instructions for how to obtain
these values are described in the [library documentation](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=service-account).

```sh
export GOOGLE_PRIVATE_KEY=$( jq .private_key service_account.json  | sed -r 's/\\n/\\\n/g;s/\\//g;s/"//g' )
export GOOGLE_SERVICE_ACCOUNT_EMAIL=$( jq .client_email service_account.json  | sed -r 's/\\n/\\\n/g;s/\\//g;s/"//g' )
```

### Run Script

```sh
npm run generate
```

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
