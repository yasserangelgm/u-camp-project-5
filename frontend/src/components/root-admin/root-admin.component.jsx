import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer.component';
import { AdminHeader } from './admin-header/admin-header.component';

const RootAdmin = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootAdmin;
