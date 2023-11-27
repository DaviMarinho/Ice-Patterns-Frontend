import React from 'react';

export const BoosterContext = React.createContext({
  boosterActive: false,
  setBoosterActive: (value: boolean) => {},
  countdown: 0,
  setCountdown: (value: number) => {},
});