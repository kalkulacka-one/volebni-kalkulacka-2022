#!/bin/bash

if [[ $VERCEL_ENV == "production" ]]; then
  echo "Building for production environment, running database migration"
  prisma generate && prisma migrate deploy && npm run build-only && cp -r ../data ./dist/
elif [[ $VERCEL_GIT_COMMIT_REF == "staging" ]]; then
  echo "Building for preview environment, running database migration for \`staging\` branch"
  export DATABASE_URL="$DATABASE_URL_BASE/staging"
  prisma generate && prisma migrate deploy && npm run build-only:preview && cp -r ../data ./dist/
else
  echo "Building for preview environment, using a clean database for \`$VERCEL_GIT_COMMIT_REF\` branch"
  GIT_COMMIT_REF_SHA=$(echo -n $VERCEL_GIT_COMMIT_REF | openssl dgst -sha256 | sed 's/^.* //')
  export DATABASE_URL="$DATABASE_URL_BASE/$GIT_COMMIT_REF_SHA"
  prisma generate
  prisma db execute --file=<(echo "DROP SCHEMA public CASCADE; CREATE SCHEMA public;") --preview-feature
  prisma migrate deploy && npm run build-only:preview && cp -r ../data ./dist/
fi
