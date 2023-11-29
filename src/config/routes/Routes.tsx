import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./require-auth";
import ExternalPage from "../../pages/ExternalPage";
import HomePage from "../../pages/HomePage";
import PerfilPage from "../../pages/PerfilPage";
import QuestsPage from "../../pages/QuestsPage";
import ShopPage from "../../pages/ShopPage";
import ExercicesPage from "../../pages/ExercisesPage";
import ContentPage from "../../pages/ContentPage";
import NivelPage from "../../pages/NivelPage";

export function Router() {
  return (
    <Routes>
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
      <Route
        path="/nivel/:levelId"
        element={
          <RequireAuth>
            <NivelPage />
          </RequireAuth>
        }
      />
      <Route
        path="/exercise/:level"
        element={
          <RequireAuth>
            <ExercicesPage />
          </RequireAuth>
        }
      />
      <Route
        path="/content/:level"
        element={
          <RequireAuth>
            <ContentPage />
          </RequireAuth>
        }
      />
      {/* ROTAS PUBLICAS */}
      <Route path="/information" element={<ExternalPage />} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}
