/* global window, document */

import * as React from 'react'; //eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import configureStore from './state';
import { addScan } from './state/actions';
import App from './components/app';

require('../css/app.scss');

let store = configureStore();

const ipc = window.require('electron').ipcRenderer;
ipc.on('scan', function newScan(sender, scan) {
  store.dispatch(addScan(scan));
});

render((
  <App store={store} />
), document.getElementById('container'));
