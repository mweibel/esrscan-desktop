import React from 'react'
import { connect } from 'react-redux'
import ScanItem from './scan-item'
import translation from './../translation'

class Scans extends React.Component {
  render () {
    if (this.props.scans.length === 0) {
      return (
        <div className='bg-white no-cellspacing full-width txt-big'>
          {translation.waitingForScans}
        </div>
      )
    }
    return (
      <div className='bg-white no-cellspacing full-width'>
        {this.props.scans.map(function (scan, index) {
          return (
            <ScanItem key={scan.referenceNumber + scan.accountNumber + scan.amount} item={scan} index={index} />
          )
        })}
      </div>
    )
  }
}

Scans.propTypes = {
  scans: React.PropTypes.array.isRequired
}

function select (state) {
  return {
    scans: state.scans
  }
}

export default connect(select)(Scans)
