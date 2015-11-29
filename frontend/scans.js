/*global window */

import React from 'react';
import ScanItem from './scan-item';
import Scan from './scan';
const ipc = window.require('ipc');

export default class Scans extends React.Component {
  constructor() {
    super();

    this.state = {
      scans: []
    };
    ipc.on('scan', this.onNewScans.bind(this));
  }

  onNewScans(scan) {
    var scans = this.state.scans;

    scans.unshift(new Scan(scan));

    this.setState({
      scans: scans
    });
  }

  render() {
    if(this.state.scans.length == 0) {
      return (
        <div className="bg-white no-cellspacing full-width txt-big">
          Start scanning
        </div>
      );
    }
    return (
      <div className="bg-white no-cellspacing full-width">
        {this.state.scans.map(function(scan, index) {
          return (
            <ScanItem key={scan.rawReferenceNumber + scan.rawAccountNumber + scan.rawAmount} item={scan} index={index}/>
          );
        })}
      </div>
    );
  }
}
