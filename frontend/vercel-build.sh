#!/bin/bash

if [[ $VERCEL_ENV == "production" ]]; then
  echo "Building for production environment, running database migration"
  prisma generate && prisma migrate deploy && npm run build-only && cp -r ../data ./dist/
else
  echo "Building for \`$VERCEL_ENV\` environment, using a clean database for \`$VERCEL_GIT_COMMIT_REF\` branch"
  GIT_COMMIT_REF_SHA=$(echo -n $VERCEL_GIT_COMMIT_REF | openssl dgst -sha256 | sed 's/^.* //')
  export DATABASE_URL="$DATABASE_URL_BASE/$GIT_COMMIT_REF_SHA"
  prisma generate && prisma migrate reset --force && npm run build-only -- --mode $VERCEL_ENV && cp -r ../data ./dist/
fi
