#!/bin/bash
set -e # exit with nonzero exit code if anything fails

echo "-- Starting deployment"

git remote set-url origin https://${GH_TOKEN}@github.com/mweibel/esrscan-desktop.git
git config --global user.name $GIT_AUTHOR_NAME
git config --global user.email $GIT_AUTHOR_EMAIL

echo "--- Creating commit for package.json update in branch ${TRAVIS_BRANCH}"

git add package.json
git commit -m "chore(package): Release version ${TRAVIS_TAG}"
git push -q origin ${TRAVIS_BRANCH}

echo "--- Updated package.json with latest release"

echo "--- Starting update of gh-pages"

git fetch origin gh-pages
git checkout gh-pages

url="https://github.com/mweibel/esrscan-desktop/releases/download/${TRAVIS_TAG}/ESRScan.dmg"

# replace old OSX dmg download link with new one
sed -i '' 's#<a href=".*ESRScan.dmg"#<a href="'${url}'"#g' ./index.html

echo "--- Adding the following diff"
git diff
echo "--- Creating commit"

git add index.html
git commit -m "docs(gh-pages): Release ${TRAVIS_TAG}: update download links"
git push -q origin gh-pages 2>&1

echo "-- Done deploying"
