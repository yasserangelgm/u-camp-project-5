import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Footer from '../footer/footer.component';
import { Header } from '../header/header.component';

const Root = () => {
  const context = useAuth();
  console.log(context);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
