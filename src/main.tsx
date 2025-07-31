import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ThemeProvider } from 'reactjs-ui-core';
import { BrowserRouter } from 'react-router-dom';
import { EnvProvider } from '@components/EnvProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EnvProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </EnvProvider>
  </React.StrictMode>
);
