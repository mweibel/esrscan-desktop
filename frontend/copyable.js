import React from 'react';

/** global window */
const clipboard = window.require('clipboard');

export default class Copyable extends React.Component {
  onClick(el) {
    clipboard.writeText(el.target.innerHTML.trim());
  }

  render() {
    return (
      <a className="copyable" onClick={this.onClick} href="#">
        {this.props.text} <i className="dis-hidden fa fa-clipboard"></i>
      </a>
    );
  }
}
