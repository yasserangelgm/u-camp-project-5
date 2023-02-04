import axios from '../api/axios';
import useAuth from './useAuth';
import useUser from './useUser';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { setCurrentUser } = useUser();
  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });

    setCurrentUser((prev) => {
      return response.data.user;
    });

    setAuth((prev) => {
      return {
        ...prev,
        role: response.data.user.role,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
