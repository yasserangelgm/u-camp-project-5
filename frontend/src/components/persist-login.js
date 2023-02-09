import { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { getUserById } from '../context/actions/auth.actions';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const { authState, authDispatch } = useAuth();
  const location = useLocation();

  useEffect(() => {
    getUserById()(authDispatch);
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PersistLogin;
