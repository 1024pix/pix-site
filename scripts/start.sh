#!/bin/bash -e

if [ "$SSR_ENABLED" == "true" ]
then
  npm run start:ssr
else
  npm run start:static
fi

