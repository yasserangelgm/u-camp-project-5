import { createContext, useReducer, useState } from 'react';
import authInitialState from '../initialStates/authInitialState';
import authReducer from '../reducers/auth.reducer';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || false
  );

  return (
    <AuthContext.Provider
      value={{ authState, authDispatch, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
