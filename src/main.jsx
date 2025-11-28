import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Insem from './components/Insem';
import Apps from './components/Apps';
import Attendace from './components/Attendace';
import Weather from './components/Weather';
import ThemeProvider from './components/Themeprovider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider />
    </BrowserRouter>
  </React.StrictMode>,
);
