// Example src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional global styles
import App from './App'; // Importing the component we just made

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);