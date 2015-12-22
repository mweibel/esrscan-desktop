import React from 'react';
import translation from './translation';

/* global window */
const clipboard = window.require('clipboard');

export default class Copyable extends React.Component {
  constructor() {
    super();

    this.state = {
      'copied': false
    };
  }

  onClick() {
    clipboard.writeText(this.props.text.trim());

    this.setState({
      copied: true
    });
  }

  onMouseOut() {
    this.setState({
      copied: false
    });
  }

  render() {
    return (
      <a onMouseOut={this.onMouseOut.bind(this)} onClick={this.onClick.bind(this)} className="copyable tooltip-link pos-rel dis-inline" href="#">
        <span className="copyable-text">{this.props.text}</span><i className="pls dis-hidden fa fa-clipboard"></i>
        <span className="mlm txt-small tooltip">{this.state.copied ? translation.copied : translation.copyToClipboard}</span>
      </a>
    );
  }
}
