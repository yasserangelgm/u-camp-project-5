import React from 'react';
import ReactDOM from 'react-dom/client';
import './custom.scss';
import App from './App';
import { AuthProvider } from './context/providers/authProvider';
import { UserProvider } from './context/providers/userProvider';
import { ProductProvider } from './context/providers/productProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
