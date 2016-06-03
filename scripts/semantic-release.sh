#!/bin/bash

# http://stackoverflow.com/questions/3601515/how-to-check-if-a-variable-is-set-in-bash
if [ -z ${TRAVIS_TAG+x} ]; then
  echo "-- TRAVIS_TAG is not set, not trying to do semantic-release."
  exit 0
fi

URL='https://github.com/mweibel/esrscan-desktop/releases/tag/${TRAVIS_TAG}'
HTTP_CODE=$(curl --write-out %{http_code} --silent --output /dev/null "$URL")

if [ $HTTP_CODE = "404" ]; then
  echo "-- Release doesn't exist yet, running semantic release."
  npm run semantic-release-publish
fi
