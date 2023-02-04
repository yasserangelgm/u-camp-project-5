import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer.component';
import AdminHeader from './admin-header/admin-header.component';
import AdminNavbar from './admin-navbar/admin-navbar.component';
import './root-admin.styles.css';

const RootAdmin = () => {
  return (
    <>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row root-content">
          <AdminNavbar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet />
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default RootAdmin;
