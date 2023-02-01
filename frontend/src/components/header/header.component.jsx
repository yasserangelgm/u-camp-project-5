import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.css';

export const Header = () => {
  return (
    <>
      <header className="main-header">
        <nav>
          <ul className="navigation">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
            <li>
              <Link to="/admin/dashboard/">Admin</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
