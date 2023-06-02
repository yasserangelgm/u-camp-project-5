import { createContext, useReducer, useState } from 'react';
import authInitialState from '../initialStates/authInitialState';
import userInitialState from '../initialStates/userInitialState';
import authReducer from '../reducers/auth.reducer';
import userReducer from '../reducers/user.reducer';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || false
  );

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        persist,
        setPersist,
        userState,
        userDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
