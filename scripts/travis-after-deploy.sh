#!/bin/bash
set -e # exit with nonzero exit code if anything fails

git checkout gh-pages

url="https://github.com/mweibel/esrscan-desktop/releases/download/${TRAVIS_TAG}/ESRScan.dmg"

# replace old OSX dmg download link with new one
sed -i '' 's#<a href=".*/ESRScan.dmg"#<a href="'$url'"#g' ./index.html

git add index.html
git commit -m 'Release ${TRAVIS_TAG}: update download links'
git push origin gh-pages
