import React from 'react';
import ReactDOM from 'react-dom';

import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import {Provider} from 'react-redux'

import App from './components/App';

const store = configureStore({
  reducer: rootReducer
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
