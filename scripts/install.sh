#!/bin/bash

if [[ "$ESRSCAN_BUILD" == "windows" ]]; then
  sudo apt-get install wine makensis gnu-tar
fi

if [[ "$ESRSCAN_BUILD" == "linux" ]]; then
  gem install fpm
fi
