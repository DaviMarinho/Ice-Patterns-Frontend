import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './require-auth';
import ExternalPage  from '../../pages/ExternalPage';
import HomePage from '../../pages/HomePage';
import PerfilPage from '../../pages/PerfilPage';
import QuestsPage from '../../pages/QuestsPage';
import ShopPage from '../../pages/ShopPage';

export function Router() {
  return (
    <Routes>
      {/* ROTAS PRIVADAS */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/perfil"
        element={
          <RequireAuth>
            <PerfilPage />
          </RequireAuth>
        }
      />
      <Route
        path="/quests"
        element={
          <RequireAuth>
            <QuestsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/shop"
        element={
          <RequireAuth>
            <ShopPage />
          </RequireAuth>
        }
      />

      {/* ROTAS PUBLICAS */}
      <Route path="/information" element={<ExternalPage />} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}