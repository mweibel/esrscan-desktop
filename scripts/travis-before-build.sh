#!/bin/bash
set -e # exit with nonzero exit code if anything fails

if [[ "$ESRSCAN_BUILD" == "osx" ]]; then
  exit 0
fi

# http://stackoverflow.com/questions/3601515/how-to-check-if-a-variable-is-set-in-bash
if [ -z ${TRAVIS_TAG+x} ] || [ "$TRAVIS_TAG" == "" ]; then
  echo "-- TRAVIS_TAG is not set, not updating builder version"
  exit 0
fi

echo "-- Setting builder version for windows & linux to ${TRAVIS_TAG}"

# http://stackoverflow.com/questions/5694228/sed-in-place-flag-that-works-both-on-mac-bsd-and-linux
# sed cross platform compatible needs a `-i.back` instead of just using `-i ''`
sed -i.bak -e 's#"version": "0.0.1-dev"#"version": "'${TRAVIS_TAG}'"#g' app/package.json

cat app/package.json
ls -lah app/package*

echo "-- Finished update of builder version"
