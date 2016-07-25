import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';
import { fetchStops } from './api'
import Papa from 'papaparse';

const store = configureStore()
render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
)
