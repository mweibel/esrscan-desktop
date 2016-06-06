const path = require('path')
const execSync = require('child_process').execSync
const packager = require('electron-packager')
const argv = require('minimist')(process.argv.slice(2))
const pkgElectron = require('../node_modules/electron-prebuilt/package.json')
const pkgInfo = require('../package.json')

const osList = {
  'osx': {
    'platform': 'darwin',
    'arch': 'x64',
    'out': 'osx',
    'icon': 'assets/osx/app-icon.icns'
  },
  'win': {
    'platform': 'win32',
    'arch': 'ia32',
    'out': 'win',
    'icon': 'assets/win/icon.ico'
  },
  'linux': {
    'platform': 'linux',
    'arch': 'x64',
    'out': 'linux',
    'icon': 'assets/linux/icon.ico'
  }
}
const os = osList[argv.os]

const shaHash = execSync('git rev-parse HEAD').toString().substr(0, 7)

const options = {
  dir: './',
  name: 'ESRScan',
  out: path.join('release', os.out),
  platform: os.platform,
  arch: os.arch,
  icon: os.icon,
  version: pkgElectron.version,
  'app-version': pkgInfo.version,
  'app-category-type': 'public.app-category.productivity',
  'build-version': shaHash,
  sign: 'Developer ID Application: Michael Weibel (A3Q6Z5FR3P)',
  prune: true,
  asar: true,
  ignore: [
    '^/assets/?',
    '^/build/?',
    '^/css/?',
    '^/frontend/?',
    '^/i18n/?',
    '^/release/?',
    '^/test/?',
    '^/\/\.*/', // eslint-disable-line no-useless-escape
    '/builder.json',
    '^/main\.js', // eslint-disable-line no-useless-escape
    '^/server\.js', // eslint-disable-line no-useless-escape
    '^/package\.js$', // eslint-disable-line no-useless-escape
    'webpack\.*', // eslint-disable-line no-useless-escape
    '^/webpack/'
  ]
}

packager(options, function done (err, appPaths) {
  if (err) {
    if (err.message) {
      console.error(err.message)
    } else {
      console.error(err, err.stack)
    }
    process.exit(1)
  }

  console.log('Wrote new app to', appPaths[0])
})
