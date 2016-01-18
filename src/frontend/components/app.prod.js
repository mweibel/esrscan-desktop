import * as React from 'react' // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'
import Scans from './scans.js'

function App ({ store }) {
  return (
    <Provider store={store}>
      <div>
        <Scans/>
      </div>
    </Provider>
  )
}

export default App
