import * as React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExternalPage from './pages/ExternalPage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import PerfilPage from './pages/PerfilPage';
import QuestsPage from './pages/QuestsPage';
import { ChakraProvider } from '@chakra-ui/react'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExternalPage />}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/shop" element={<ShopPage />}/>
          <Route path="/perfil" element={<PerfilPage />}/>
          <Route path="/quests" element={<QuestsPage />}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;