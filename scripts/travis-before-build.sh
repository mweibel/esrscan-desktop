#!/bin/bash
set -e # exit with nonzero exit code if anything fails

if [[ "$ESRSCAN_BUILD" == "osx" ]]; then
  exit 0
fi

# http://stackoverflow.com/questions/3601515/how-to-check-if-a-variable-is-set-in-bash
if [ -z ${TRAVIS_TAG+x} ]; then
  echo "-- TRAVIS_TAG is not set, not updating builder version"
  exit 0
fi

echo "-- Setting builder version for windows & linux to ${TRAVIS_TAG}"

sed -i 's#"version": "0.0.1"#"version": "'${TRAVIS_TAG}'"#g' package.json

echo "-- Finished update of builder version"
