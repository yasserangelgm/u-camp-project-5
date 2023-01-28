import React from 'react';
import { Link } from 'react-router-dom';

export const AdminHeader = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/categories">Categorias</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/users">Usuarios</Link>
          </li>
          <li>
            <Link to="/logout">Cerrar sesion</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
