/*global window */

import React from 'react';
import Scan from './scan.js';
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
    scans.push(scan);

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
        {this.state.scans.map(function(scan) {
          return (
            <Scan key={scan.refNum} item={scan}/>
          );
        })}
      </div>
    );
  }
}
