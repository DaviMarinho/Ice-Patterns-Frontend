// App.tsx

import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./config/routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BoosterProvider } from "./context/BoosterContext";
import { SocketProvider } from "./context/SocketContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <BoosterProvider>
            <SocketProvider>
              <Router />
            </SocketProvider>
          </BoosterProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
