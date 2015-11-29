import React from 'react';
import Scan from './scan';

const clipboard = window.require('clipboard');

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

export default class ScanItem extends React.Component {
  onClick(el) {
    clipboard.writeText(el.target.innerHTML.trim());
  }

  render () {
    var classes = 'row brd-bottom-grey phh txt-big';
    if(this.props.index === 0) {
      classes = 'ptn ' + classes;
    }

    return (
      <div className={classes}>
        <p>
          <span className="txt-grey prs">{translation.accountNumber}:</span>
          <a className="copyable" onClick={this.onClick} href="#">
            {this.props.item.accountNumber()} <i className="dis-hidden fa fa-clipboard"></i>
          </a>
        </p>
        {this.props.item.rawAmount ? (
          <p>
            <span className="txt-grey prs">{translation.amount}:</span>
            CHF <a className="copyable" onClick={this.onClick} href="#">{this.props.item.amount()} <i className="dis-hidden fa fa-clipboard"></i></a>
          </p>
        ) : null}
        <p>
          <span className="txt-grey prs">{translation.referenceNumber}:</span>
          <a className="copyable" onClick={this.onClick} href="#">
            {this.props.item.referenceNumber()} <i className="dis-hidden fa fa-clipboard"></i>
          </a>
        </p>
      </div>
    );
  }
}
ScanItem.propTypes = {
  item: React.PropTypes.instanceOf(Scan),
  index: React.PropTypes.number
};
