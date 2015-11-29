import React from 'react';
import translation from './translation';

export default class ErrorCheck extends React.Component {
  render() {
    if (this.props.isCorrect) {
      return (
        <a className="tooltip-link mlm">
          <i className="fa fa-exclamation-triangle txt-yellow"></i>
          <span className="mlm txt-small tooltip">{translation.incorrectScan}</span>
        </a>
      );
    }
    return null;
  }
}
