import React, { createContext, useContext, useReducer, Dispatch, ReactNode } from 'react';

interface User {
  username: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: AuthState;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload?.token || '');
      return {
        ...state,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
  
    return (
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
  return useContext(AuthContext);
};
