import React from 'react';
import Copyable from './copyable';
import ErrorCheck from './error-check';
import translation from './../translation';

export default class ScanItem extends React.Component {
  render () {
    var classes = 'row brd-bottom-grey phh';
    if(this.props.index === 0) {
      classes = 'ptn ' + classes;
    }

    return (
      <div className={classes}>
        <ErrorCheck item={this.props.item}/>
        <p className="txt-big">
          <Copyable label={translation.accountNumber} text={this.props.item.accountNumber}/>
        </p>
        {this.props.item.amount ? (
          <p className="txt-big">
            <Copyable
              label={translation.amount}
              textToCopy={this.props.item.amount}
              text={'CHF ' + this.props.item.amount}
            />
          </p>
        ) : null}
        <p className="txt-big">
          <Copyable label={translation.referenceNumber} text={this.props.item.referenceNumber}/>
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
