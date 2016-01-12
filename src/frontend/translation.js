// the following code is pretty ugly.
// should find a better way to do i18n
const osLocale = require('os-locale');

const availableLocales = ['en', 'de', 'fr'];
const defaultLocale = 'en';

var locale = osLocale.sync().split('_')[0];
if (availableLocales.indexOf(locale) !== 0) {
  locale = defaultLocale;
}

module.exports = require('../i18n/' + locale);
