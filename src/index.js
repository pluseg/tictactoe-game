import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga';

import App from './components/App';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, sagaMiddleware]
});

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
