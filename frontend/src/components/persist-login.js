import { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { getAuth } from '../context/actions/auth.actions';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const {
    authState: { auth, persist },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    getAuth()(authDispatch);
    let isMounted = true;

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {persist === true ? (
        <Outlet />
      ) : auth.inProgress ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
