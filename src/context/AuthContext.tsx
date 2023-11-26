import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '../utils/toast';
import api from '../config/axios';
import { SignedUser, SignInCredentials, AuthResponse } from '../types/auth.d';

interface AuthContextData {
  signOut(): void;
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: SignedUser | null;
  verifyExpiredToken(): void;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SignedUser | null>(() => {
    const loadedUser = localStorage.getItem('user');

    if (!loadedUser) return {} as SignedUser;

    return JSON.parse(loadedUser);
  });
  const isAuthenticated = !!user?.token;

  const signIn = useCallback(
    async ({ identifier, password }: SignInCredentials) => {
      try {
        const response = await api.post<AuthResponse>(`login`, {
          identifier,
          password,
        });

        const {
          email,
          expireIn,
          name,
          username,
          token,
          id,
          temporaryPassword,
        } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            name,
            email,
            expireIn,
            token,
            username,
            id,
            temporaryPassword,
          })
        );

        setUser({ email, expireIn, name, token, username, id });

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const from = location.state?.from?.pathname || '/';

        if (temporaryPassword) {
          navigate('/change-password');
        } else {
          navigate(from, { replace: true });
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err.response.data.error);
      }
    },
    [navigate, location.state?.from?.pathname]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);

    navigate('/information');
  }, [navigate]);

  const decodeToken = (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken;
    } catch (error) {
      return null; // Token inválido ou erro ao decodificar
    }
  };

  const isTokenExpired = useCallback((token: string): boolean => {
    const decodedToken = decodeToken(token);

    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    return currentTime >= expirationTime;
  }, []);

  const verifyExpiredToken = useCallback(() => {
    const token = String(localStorage.getItem('token'));
    const expired = isTokenExpired(token);

    if (expired) {
      toast.error('Token expirado, faça o login novamente', 'Erro');
      signOut();
    }
  }, [isTokenExpired, signOut]);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      isAuthenticated,
      user,
      verifyExpiredToken,
    }),
    [signIn, signOut, isAuthenticated, user, verifyExpiredToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}