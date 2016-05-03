//TODO: Create a rootReducer file that combines the reducers
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';

import apiMiddleware from '../middleware/apiMiddleware.js';

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(thunk, apiMiddleware, reduxRouterMiddleware)(createStore);

export default function configureStore(appName, initialState) {
  const reducer = require('../reducers/' + appName + '/index.js').default;
  const store = createStoreWithMiddleware(reducer, initialState);

  return store;
}


