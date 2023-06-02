import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const {
    authState: { auth },
  } = useAuth();
  const location = useLocation();

  return auth?.data?.user.role === 1 ? (
    <Outlet />
  ) : auth?.data?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
