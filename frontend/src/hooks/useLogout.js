import axios from '../api/axios';
import useAuth from './useAuth';
import useUser from './useUser';

const useLogout = () => {
  const { setAuth } = useAuth();
  const { setCurrentUser } = useUser();
};

export default useLogout;
