import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;
