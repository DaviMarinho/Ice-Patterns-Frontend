import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./config/routes/Routes";
import { AuthProvider } from './context/AuthContext';
import { ChakraProvider } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
