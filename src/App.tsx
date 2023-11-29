// App.tsx

import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./config/routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BoosterProvider } from "./context/BoosterContext";
import { SocketProvider } from "./context/SocketContext";
import UserInformationContext from "./context/UserContext";
import { useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

interface UserInformation {
  username: string;
  email: string;
  name: string;
  qtBooster: number;
  qtEnergy: number;
  qtCube: number;
  qtXpOnLevel: number;
  qtXpTotal: number;
  sublevel: Sublevel;
}

interface Sublevel {
  id: string;
  numSublevel: number;
  numLevel: number;
  name: string;
}

const App: React.FC = () => {
  const [userInformations, setUserInformations] = useState<UserInformation>();

  return (
    <SkeletonTheme baseColor="#d0f2ff" highlightColor="#214e96">
      <BrowserRouter>
        <ChakraProvider>
          <AuthProvider>
            <BoosterProvider>
              <UserInformationContext.Provider
                value={{ userInformations, setUserInformations }}
              >
                <SocketProvider>
                  <Router />
                </SocketProvider>
              </UserInformationContext.Provider>
            </BoosterProvider>
          </AuthProvider>
        </ChakraProvider>
      </BrowserRouter>
    </SkeletonTheme>
  );
};

export default App;
