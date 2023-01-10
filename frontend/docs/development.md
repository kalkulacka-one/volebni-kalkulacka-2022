# Development

## Running Volební kalkulačka for development

---

🚧 WIP 🚧

### Step by step guide

- [ ] Clone the repository

  ```console
  git clone git@github.com:cesko-digital/volebni-kalkulacka-2022.git
  ```

  and if you don't have write access to the main repository, and add your fork as a remote:

  ```console
  cd volebni-kalkulacka-2022 \
    && git remote add fork git@github.com:me/volebni-kalkulacka-2022.git
  ```

- [ ] Run `npm install` in `/frontend`:

  ```console
  cd frontend \
    && npm install
  ```

#### A) Running only Vue frontend

If you need to work just with the frontend, the easiest way is to run just Vue frontend using production data & database.

- [ ] Copy `.env.development.local.example` to `.env.development.local`

  ```console
  cp .env.development.local.example .env.development.local
  ```

- [ ] Uncomment the `DATA_PROXY` and `API_PROXY` environment variables

  ```sh
  DATA_PROXY=https://volebnikalkulacka.cz
  API_PROXY=https://volebnikalkulacka.cz
  
  …
  ```

- [ ] Compile and hot-reload Vue frontend

  ```console
  npm run dev
  ```

To use local data, simply comment out the `DATA_PROXY` environment variable. A fresh data from `/data` are copied to `/public/data` when running `npm run dev` (just once, not hot-reloading).

#### B) Running frontend + backend

To run also backend serverless functions locally, you can use [Vercel CLI](https://vercel.com/docs/cli).

- [ ] [Create a Vercel account](https://vercel.com/signup)

- [ ] _Optionally, ask [@martinwenisch](https://github.com/martinwenisch) for Česko.Digital project access on Vercel_

- [ ] [Sign up for CockroachDB](https://cockroachlabs.cloud), create your own database cluster and retrieve the database connection string

- [ ] Copy `.env.development.local.example` to `.env.development.local`

  ```console
  cp .env.development.local.example .env.development.local
  ```

- [ ] Paste the connection string (without `/defaultdb?sslmode=verify-full`) to the `DATABASE_URL_BASE` variable and uncomment `DATABASE_NAME`, `DATABASE_URL_BASE` and `DATABASE_URL` variables

  ```sh
  …
  
  DATABASE_NAME=defaultdb
  DATABASE_URL_BASE=postgresql://john-doe:HUVAkcJHcpffDZuSuQLmwN@john-doe-development-5467.7tc.cockroachlabs.cloud:26257
  DATABASE_URL=postgresql://${DATABASE_URL_BASE}/${DATABASE_NAME}
  ```

- [ ] To reset your database, run all migrations and generate client, run

  ```console
  npm run dev:db:reset
  ```

  After performing any changes to Prisma schema file at [`/schema/prisma/schema.prisma`](../schema/prisma/schema.primsa), run the following to create a migration, apply it and generate new client

  ```console
  npm run dev:db:migrate
  ```

  You can also run

  ```console
  npm run dev:db:studio
  ```

  to start a web client and browse the data.

- [ ] Start and hot-reload frontend & backend via Vercel

  ```console
  npm run dev:vercel
  ```

  _In case you don't have access to Česko.Digital project or won't link it, you need to manually adjust the project settings on Vercel to use `frontend` as root directory, Vite as framework preset and `npm run build:vercel` as a build command._

#### C) Running Storybook for component development

Use [Storybook](https://storybook.js.org) to work on the presentational components.

- [ ] Start and hot-reload Storybook

  ```console
  npm run storybook
  ```
