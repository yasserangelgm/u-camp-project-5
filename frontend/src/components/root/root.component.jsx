import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer.component';
import { Header } from '../header/header.component';

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
