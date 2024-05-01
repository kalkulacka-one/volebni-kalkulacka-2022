#!/bin/bash

echo "VERCEL_PROJECT_PRODUCTION_URL: $VERCEL_PROJECT_PRODUCTION_URL"

if [[ "$VERCEL_PROJECT_PRODUCTION_URL" == "www.volebnakalkulacka.sk" ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi
