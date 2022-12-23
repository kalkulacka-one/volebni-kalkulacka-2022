#!/bin/bash

if [[ $VERCEL_ENV == "production" ]]; then
  echo "Building for production environment, running database migration"
  prisma generate && prisma migrate deploy && npm run build-only && cp -r ../data ./dist/
else
  echo "Building for \`$VERCEL_ENV\` environment, using a clean database for \`$VERCEL_GIT_COMMIT_SHA\` commit"
  export DATABASE_URL="$DATABASE_URL_BASE/$VERCEL_GIT_COMMIT_SHA"
  prisma generate && prisma migrate reset --force && npm run build-only -- --mode $VERCEL_ENV && cp -r ../data ./dist/
fi
