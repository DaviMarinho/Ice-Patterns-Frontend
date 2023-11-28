// App.tsx

import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './config/routes/Routes';
import { AuthProvider } from './context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';
import { BoosterProvider } from './context/BoosterContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <BoosterProvider>
            <Router />
          </BoosterProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
