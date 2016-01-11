import { createStore } from 'redux';
import { reducers } from './reducers';

export default function configureStore(initialState) {
  return createStore(reducers, initialState);
}
