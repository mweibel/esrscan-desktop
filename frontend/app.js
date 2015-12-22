/* global window, document */

import React from 'react'; //eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './state/reducers';
import { addScan } from './state/actions';
import Scans from './scans.js';
import DevTools from './devtools';

let finalCreateStore = compose(
  DevTools.instrument()
)(createStore);

function configureStore(initialState) {
  const store = finalCreateStore(reducers, initialState);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if(module.hot) {
    module.hot.accept('./state/reducers', function() {
      store.replaceReducer(require('./state/reducers').default);
    });
    module.hot.accept('./state/actions', function() {
      store.replaceReducer(require('./state/actions').default);
    });
  }

  return store;
}

let store = configureStore();

const ipc = window.require('ipc');
ipc.on('scan', function newScan(scan) {
  store.dispatch(addScan(scan));
});

ReactDOM.render((
  <Provider store={store}>
    <div>
      <Scans/>
      <DevTools/>
    </div>
  </Provider>
), document.getElementById('container'));
