import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {EncryptionProvider} from './context/EncryptionContext.js'
import './index.css'; // Optional: your global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EncryptionProvider>
      <App />
    </EncryptionProvider>
  </React.StrictMode>
);
