import { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

export function RequireAuth({ children }: { children: ReactElement }) {
  const { isAuthenticated, verifyExpiredToken } = useAuth();

  const location = useLocation();

  useEffect(() => {
    verifyExpiredToken();
  }, [verifyExpiredToken]);

  if (!isAuthenticated) {
    return <Navigate to="/information" state={{ from: location }} replace />;
  }

  return children;
}
