import {RawProvider} from '@react-raw/core';
import React from 'react';
import ReactDOM from 'react-dom/client';

import {App} from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw Error('`rootElement` is not defined');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RawProvider>
      <App />
    </RawProvider>
  </React.StrictMode>
);
