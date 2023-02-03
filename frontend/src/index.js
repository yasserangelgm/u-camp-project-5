import React from 'react';
import ReactDOM from 'react-dom/client';
import './custom.scss';
import App from './App';
import { AuthProvider } from './context/authProvider';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/userProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
