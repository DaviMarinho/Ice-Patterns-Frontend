import React, { createContext, useContext, useReducer, Dispatch, ReactNode, useEffect, useCallback } from 'react';

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
  verifyExpiredToken: () => void;
  isAuthenticated: boolean;
}>({
  state: initialState,
  dispatch: () => {},
  verifyExpiredToken: () => {},
  isAuthenticated: false,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload) {
        localStorage.setItem('token', action.payload.token || '');
      }
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

  const verifyExpiredToken = useCallback(() => {
    const { token } = state;

    if (token) {
      try {
        const decodedToken = (token: string): any => {
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(window.atob(base64));
            return decodedToken;
          } catch (error) {
            return null; // Token inválido ou erro ao decodificar
          }
        };

        if (decodedToken && typeof decodedToken === 'object') {
          const { exp } = decodedToken;
          const currentTime = Date.now() / 1000;

          if (exp && exp < currentTime) {
            // Token expirado, faça logout
            dispatch({ type: 'LOGOUT' });
          }
        }
      } catch (error) {
        // Token inválido, faça logout
        dispatch({ type: 'LOGOUT' });
      }
    }
  }, [state, dispatch]);

  const isAuthenticated = !!state.token;

  useEffect(() => {
    verifyExpiredToken();
  }, [verifyExpiredToken]);

  return (
    <AuthContext.Provider value={{ state, dispatch, verifyExpiredToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
