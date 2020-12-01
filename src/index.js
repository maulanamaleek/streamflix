import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import MovieProvider from './utils/MovieContext';

ReactDOM.render(
  <MovieProvider>
    <App />
  </MovieProvider>,
  document.getElementById('root'),
);
