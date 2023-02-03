import axios from '../api/axios';
import useAuth from './useAuth';
import useUser from './useUser';

const useLogout = () => {
  const { setAuth } = useAuth();
  const { setCurrentUser } = useUser();
  const logout = async () => {
    setAuth({});
    setCurrentUser({ currentUser: null, setCurrentUser: () => null });
    try {
      await axios('/logout', {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
