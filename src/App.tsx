import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./config/routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BoosterContext } from "./context/BoosterContext";

const App: React.FC = () => {
  const [boosterActive, setBoosterActive] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);

  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
        <BoosterContext.Provider value={{ boosterActive, setBoosterActive, countdown, setCountdown }}>
            <Router />
            </BoosterContext.Provider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
