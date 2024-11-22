#!/bin/bash

echo "VERCEL_PROJECT_PRODUCTION_URL: $VERCEL_PROJECT_PRODUCTION_URL"

# for testing
exit 1;

if [[ "$VERCEL_PROJECT_PRODUCTION_URL" == "testvot.eu" ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi
