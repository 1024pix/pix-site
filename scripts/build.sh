#!/bin/bash -e

if [ "$SSR_ENABLED" == "true" ]
then
  npm run build:ssr
else
  npm run build:static
fi

