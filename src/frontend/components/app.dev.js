import * as React from 'react'; //eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import Scans from './scans.js';
import DevTools from './devtools';

export default function({ store }) {
  return (
    <Provider store={store}>
      <div>
        <Scans/>
        <DevTools/>
      </div>
    </Provider>
  );
}
