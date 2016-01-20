#!/bin/bash
set -e # exit with nonzero exit code if anything fails

git remote set-url origin https://${GH_TOKEN}@github.com/mweibel/esrscan-desktop.git

git add package.json
git commit -m "Version ${TRAVIS_TAG}"
git push origin ${TRAVIS_BRANCH}

git fetch origin gh-pages
git checkout gh-pages

url="https://github.com/mweibel/esrscan-desktop/releases/download/${TRAVIS_TAG}/ESRScan.dmg"

# replace old OSX dmg download link with new one
sed -i '' 's#<a href=".*ESRScan.dmg"#<a href="'${url}'"#g' ./index.html

git config --global user.name $GIT_AUTHOR_NAME
git config --global user.email $GIT_AUTHOR_EMAIL

git add index.html
git commit -m "Release ${TRAVIS_TAG}: update download links"
git push -q origin gh-pages 2>&1
