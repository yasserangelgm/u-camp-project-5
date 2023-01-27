import React from 'react';
import { Outlet } from 'react-router-dom';

const RootAdmin = () => {
  return (
    <div>
      <h1>Root Admin component</h1>
      <Outlet />
    </div>
  );
};

export default RootAdmin;
