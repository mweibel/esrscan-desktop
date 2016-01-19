import React from 'react'
import translation from './../translation'

export default class ErrorCheck extends React.Component {
  render () {
    if (!this.props.item.amountCorrect || !this.props.item.referenceNumberCorrect) {
      var fields = []
      // ugly, and probably not correct in all languages )
      if (!this.props.item.amountCorrect) {
        fields.push(translation.amount.toLowerCase())
      }
      if (!this.props.item.referenceNumberCorrect) {
        fields.push(translation.referenceNumber.toLowerCase())
      }
      fields = fields.join(' ' + translation.and + ' ')

      return (
        <span className='mbm'>
          <i className='fa fa-exclamation-triangle txt-yellow txt-small'></i>
          <span className='mlm txt-small'>{translation.incorrectScan.replace('{fields}', fields)}</span>
        </span>
      )
    }
    return null
  }
}

ErrorCheck.propTypes = {
  item: React.PropTypes.object.isRequired
}
