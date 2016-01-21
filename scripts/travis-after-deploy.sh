#!/bin/bash
set -e # exit with nonzero exit code if anything fails

echo "-- Starting update of gh-pages for tag ${TRAVIS_TAG}"

# undoing pending change to package.json before switching branches
git checkout -- package.json

echo "--- Setting up local repository"

git remote add upstream https://${GITHUB_TOKEN}@github.com/mweibel/esrscan-desktop.git

git config --global user.name $GIT_AUTHOR_NAME
git config --global user.email $GIT_AUTHOR_EMAIL

git fetch upstream gh-pages
git checkout gh-pages

echo "--- Updating index.html"

url="https://github.com/mweibel/esrscan-desktop/releases/download/${TRAVIS_TAG}/ESRScan.dmg"

# replace old OSX dmg download link with new one
sed -i '' 's#<a href=".*ESRScan.dmg"#<a href="'${url}'"#g' ./index.html

echo "--- Changes to be commited:"
echo "---------------------------"
git --no-pager diff
echo "---------------------------"

git add index.html
git commit -m "chore(website): Deploy release ${TRAVIS_TAG}"
git push -q upstream gh-pages 2>&1

echo "-- Finished update of gh-pages"
