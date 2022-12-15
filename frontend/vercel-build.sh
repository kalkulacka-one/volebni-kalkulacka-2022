#!/bin/bash

if [[ $VERCEL_ENV == "production" ]]; then
  echo "Running production database migration"
  prisma generate && prisma migrate deploy && npm run build && cp -r ../data ./dist/
else
  echo "Running on $($VERCEL_ENV), using a clean database for $($VERCEL_GIT_COMMIT_REF) commit"
  export DATABASE_URL="$DATABASE_URL_BASE/$VERCEL_GIT_COMMIT_REF"
  prisma generate && prisma migrate reset --force && npm run build && cp -r ../data ./dist/
fi
