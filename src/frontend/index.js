/* global window, document */

import * as React from 'react' // eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import configureStore from './state'
import { addScan } from './state/actions'
import App from './components/app'
import translation from './translation'
const ipc = window.require('electron').ipcRenderer

require('../../assets/css/app.scss')

let store = configureStore()

ipc.on('scan', function newScan (sender, scan) {
  store.dispatch(addScan(scan))
})
ipc.on('connection-info', function connectionInfo (sender, info) {
  new window.Notification(translation.connected, { // eslint-disable-line no-new
    body: translation.connectedSuccessfully.replace('{name}', info.name)
  })
})

const crashReporter = window.require('electron').crashReporter

const opts = {
  productName: 'ESRScan Desktop',
  companyName: 'Michael Weibel',
  submitURL: 'https://ecs.openflex.net'
}

// Report crashes to our server.
crashReporter.start(opts)

render((
  <App store={store} />
), document.getElementById('container'))
