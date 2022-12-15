#!/bin/bash

echo $VERCEL_GIT_COMMIT_REF
echo $VERCEL_ENV

if [[ $VERCEL_ENV == "production" ]]; then
    prisma generate && prisma migrate deploy && npm run build && cp -r ../data ./dist/
else
export DATABASE_URL="$DATABASE_URL_BASE/$VERCEL_GIT_COMMIT_REF"

prisma generate && prisma migrate reset --force && npm run build && cp -r ../data ./dist/
fi
