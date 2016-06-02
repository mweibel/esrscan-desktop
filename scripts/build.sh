#!/bin/bash

if [[ "$ESRSCAN_BUILD" == "windows" ]]; then
  npm run pack:win
  npm run build:win
  mv ./release/win/ESRScan\ Setup.exe ./release/win/ESRScanSetup.exe
fi

if [[ "$ESRSCAN_BUILD" == "linux" ]]; then
  npm run pack:linux
  npm run build:linux
fi

if [[ "$ESRSCAN_BUILD" == "osx" ]]; then
  npm run pack:osx
  npm run build:osx
fi
