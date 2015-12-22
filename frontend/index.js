/* global window, document */

import * as React from 'react'; //eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import configureStore from './state';
import { addScan } from './state/actions';
import App from './components/app';

let store = configureStore();

const ipc = window.require('ipc');
ipc.on('scan', function newScan(scan) {
  store.dispatch(addScan(scan));
});

render((
  <App store={store} />
), document.getElementById('container'));
