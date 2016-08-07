import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';
import { fetchStops } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import Papa from 'papaparse';

const store = configureStore();
render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
