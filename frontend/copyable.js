import React from 'react';
import translation from './translation';

/** global window */
const clipboard = window.require('clipboard');

export default class Copyable extends React.Component {
  constructor() {
    super();

    this.state = {
      'copied': false
    };
  }

  onClick(el) {
    let targetEl = el.currentTarget.getElementsByClassName('copyable-text')[0];
    clipboard.writeText(targetEl.innerHTML.trim());

    this.setState({
      copied: true
    });
  }

  render() {
    return (
      <a className="copyable tooltip-link pos-rel dis-inline" onClick={this.onClick.bind(this)} href="#">
        <span className="copyable-text">{this.props.text}</span><i className="pls dis-hidden fa fa-clipboard"></i>
        <span className="mlm txt-small tooltip">{this.state.copied ? translation.copied : translation.copyToClipboard}</span>
      </a>
    );
  }
}
