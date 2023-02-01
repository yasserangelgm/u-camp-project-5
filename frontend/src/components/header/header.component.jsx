import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import './header.styles.css';

export const Header = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate('/');
  };
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
            <li>
              <button onClick={signOut}>Cerrar sesión</button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
