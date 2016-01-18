import React from 'react'
import translation from './../translation'

/* global window */
const clipboard = window.require('clipboard')

export default class Copyable extends React.Component {
  constructor () {
    super()

    this.state = {
      'copied': false
    }
  }

  onClick () {
    var text = this.props.textToCopy || this.props.text
    clipboard.writeText(text.trim())

    this.setState({
      copied: true
    })
  }

  onMouseOut () {
    this.setState({
      copied: false
    })
  }

  render () {
    const onMouseOut = () => { this.onMouseOut() }
    const onClick = () => { this.onClick() }
    return (
      <a onMouseOut={onMouseOut} onClick={onClick} className='copyable tooltip-link pos-rel dis-inline' href='#'>
        <span className='txt-grey prs'>{this.props.label}:</span>
        <span className='copyable-text'>{this.props.text}</span><i className='pls dis-hidden fa fa-clipboard'></i>
        <span className='mlm txt-small tooltip'>{this.state.copied ? translation.copied : translation.copyToClipboard}</span>
      </a>
    )
  }
}

Copyable.propTypes = {
  text: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  // if not provided, this will be the text to copy
  textToCopy: React.PropTypes.string
}
