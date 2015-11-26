import React from 'react';

// the following code is pretty ugly.
// should find a better way to do i18n
const osLocale = require('os-locale');

const availableLocales = ['en_US'];
const defaultLocale = 'en_US';

var locale = osLocale.sync();
if (availableLocales.indexOf(locale) === -1) {
  locale = defaultLocale;
}
const translation = require('./i18n/' + locale);

export default class Scan extends React.Component {
  render () {
    return (
      <div className="row brd-bottom-grey phh txt-big">
        <p>
          <span className="txt-grey prs">{translation.accountNumber}:</span>
          {this.props.item.accNum}
        </p>
        <p>
          <span className="txt-grey prs">{translation.amount}:</span>
          {this.props.item.amount ? 'CHF ' + this.props.item.amount : ''}
        </p>
        <p>
          <span className="txt-grey prs">{translation.referenceNumber}:</span>
          {this.props.item.refNum}
        </p>
      </div>
    );
  }
}
Scan.propTypes = {
  item: React.PropTypes.object.isRequired
};
