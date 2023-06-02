import { useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useLogout from '../hooks/useLogout';

const LogoOut = () => {
  const [isLoading, setIsLoading] = useState(true);
  const logout = useLogout();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const doLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    doLogout();
    setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, [logout]);

  return isLoading ? (
    <div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default LogoOut;
