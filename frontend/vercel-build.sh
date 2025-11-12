#!/bin/bash

if [[ $VERCEL_ENV == "production" ]]; then
  echo "Building for production environment"
  npm run build-only && cp -r ../data ./dist/
else
  echo "Building for preview environment"
  npm run build-only:preview && cp -r ../data ./dist/
fi
