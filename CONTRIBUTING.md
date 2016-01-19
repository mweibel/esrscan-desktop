# Contributing
The `master` branch contains the latest stable release of the application.
Development efforts are integrated with the `develop` branch first. Changes get then merged into `master` as soon as a new release should be published.

When opening a new Pull Request make sure you point them to `develop`. Further ensure that your code follows [standard-js](http://standardjs.com/) style guidelines and you make use of proper commit messages. ESRScan Desktop uses [Commitizen](http://commitizen.github.io/cz-cli/).

If your change depends on a change in the iOS app, please make sure to annotate this properly as a breaking change in the commit as well as in the pull request.
