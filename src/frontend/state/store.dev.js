import { createStore, compose } from 'redux'
import { reducers } from './reducers'
import DevTools from '../components/devtools'

let finalCreateStore = compose(
  DevTools.instrument()
)(createStore)

export default function configureStore (initialState) {
  const store = finalCreateStore(reducers, initialState)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducers', function () {
      store.replaceReducer(require('./reducers').default)
    })
    module.hot.accept('./actions', function () {
      store.replaceReducer(require('./actions').default)
    })
  }

  return store
}
