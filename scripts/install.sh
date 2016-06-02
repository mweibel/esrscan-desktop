#!/bin/bash

if [[ "$ESRSCAN_BUILD" == "windows" ]]; then
  sudo add-apt-repository ppa:ubuntu-wine/ppa -y
  sudo apt-get update
  sudo apt-get install wine nsis -y
fi

if [[ "$ESRSCAN_BUILD" == "linux" ]]; then
  gem install fpm
fi
