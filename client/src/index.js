import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './Router/AppRoutes';
import './sass/styles.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <AppRoutes />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);


