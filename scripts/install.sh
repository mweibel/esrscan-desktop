#!/bin/bash

if [[ "$ESRSCAN_BUILD" == "windows" ]]; then
  # wine
  sudo add-apt-repository ppa:ubuntu-wine/ppa -y
  # mono
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
  echo "deb http://download.mono-project.com/repo/debian wheezy main" | sudo tee /etc/apt/sources.list.d/mono-xamarin.list

  sudo apt-get update
  sudo apt-get install --no-install-recommends -y wine1.8 nsis mono-devel ca-certificates-mono osslsigncode
fi

if [[ "$ESRSCAN_BUILD" == "linux" ]]; then
  gem install fpm
  sudo apt-get install --no-install-recommends -y icnsutils graphicsmagick xz-utils
fi
