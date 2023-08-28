import React from 'react';
import { createRoot } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import Store from './redux/Store';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
        <App />
    </Provider>
  </React.StrictMode>
);
