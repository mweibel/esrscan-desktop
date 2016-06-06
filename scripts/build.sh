#!/bin/bash

if [[ "$ESRSCAN_BUILD" == "windows" ]]; then
  npm run build:win
  mv ./dist/win/ESRScan\ Setup.exe ./dist/win/ESRScanSetup.exe
fi

if [[ "$ESRSCAN_BUILD" == "linux" ]]; then
  npm run build:linux
fi

if [[ "$ESRSCAN_BUILD" == "osx" ]]; then
  npm run build:osx
fi
