import React from 'react';
import Copyable from './copyable';
import ErrorCheck from './error-check';
import translation from './../translation';

export default class ScanItem extends React.Component {
  render () {
    var classes = 'row brd-bottom-grey phh txt-big';
    if(this.props.index === 0) {
      classes = 'ptn ' + classes;
    }

    return (
      <div className={classes}>
        <p>
          <Copyable label={translation.accountNumber} text={this.props.item.accountNumber}/>
        </p>
        {this.props.item.amount ? (
          <p>
            <Copyable
              label={translation.amount}
              textToCopy={this.props.item.amount}
              text={'CHF ' + this.props.item.amount}
            />
            <ErrorCheck isCorrect={this.props.item.amountCorrect}/>
          </p>
        ) : null}
        <p>
          <Copyable label={translation.referenceNumber} text={this.props.item.referenceNumber}/>
          <ErrorCheck isCorrect={this.props.item.referenceNumberCorrect}/>
        </p>
      </div>
    );
  }
}
ScanItem.propTypes = {
  item: React.PropTypes.shape({
    accountNumber: React.PropTypes.string,
    amount: React.PropTypes.string,
    amountCorrect: React.PropTypes.bool,
    referenceNumber: React.PropTypes.string,
    referenceNumberCorrect: React.PropTypes.bool
  }).isRequired,
  index: React.PropTypes.number
};
