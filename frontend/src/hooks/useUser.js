import { useContext } from 'react';
import UserProvider from '../context/providers/userProvider';

const useUser = () => {
  return useContext(UserProvider);
};

export default useUser;
