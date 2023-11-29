import React from 'react';

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

const UserInformationContext = React.createContext<{
  userInformations: UserInformation | undefined;
  setUserInformations: React.Dispatch<React.SetStateAction<UserInformation | undefined>>;
}>({
  userInformations: undefined,
  setUserInformations: () => {},
});

export default UserInformationContext;