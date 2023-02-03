import { useContext } from 'react';
import UserProvider from '../context/userProvider';

const useUser = () => {
  return useContext(UserProvider);
};

export default useUser;
