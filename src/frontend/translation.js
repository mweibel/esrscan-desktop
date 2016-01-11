// the following code is pretty ugly.
// should find a better way to do i18n
const osLocale = require('os-locale');

const availableLocales = ['en_US'];
const defaultLocale = 'en_US';

var locale = osLocale.sync();
if (availableLocales.indexOf(locale) === -1) {
  locale = defaultLocale;
}
module.exports = require('../i18n/' + locale);
