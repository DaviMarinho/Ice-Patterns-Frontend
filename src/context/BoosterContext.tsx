// BoosterContext.tsx

import React, { useReducer, createContext, Dispatch } from 'react';

interface BoosterContextData {
  boosterState: BoosterState;
  boosterDispatch: Dispatch<BoosterAction>;
}

interface BoosterState {
  boosterActive: boolean;
  countdown: number;
}

type BoosterAction =
  | { type: 'ACTIVATE_BOOSTER'; countdown: number }
  | { type: 'DEACTIVATE_BOOSTER' }
  | { type: 'DECREMENT_COUNTDOWN' };

const initialBoosterState: BoosterState = {
  boosterActive: false,
  countdown: 0,
};

export const BoosterContext = createContext<BoosterContextData>({
  boosterState: initialBoosterState,
  boosterDispatch: () => {},
});

const boosterReducer = (state: BoosterState, action: BoosterAction): BoosterState => {
  switch (action.type) {
    case 'ACTIVATE_BOOSTER':
      return {
        ...state,
        boosterActive: true,
        countdown: action.countdown,
      };
    case 'DEACTIVATE_BOOSTER':
      return {
        ...state,
        boosterActive: false,
        countdown: 0,
      };
    case 'DECREMENT_COUNTDOWN':
      return {
        ...state,
        countdown: state.countdown > 0 ? state.countdown - 1 : 0,
      };
    default:
      return state;
  }
};

export const BoosterProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [boosterState, boosterDispatch] = useReducer(boosterReducer, initialBoosterState);

  return (
    <BoosterContext.Provider value={{ boosterState, boosterDispatch }}>
      {children}
    </BoosterContext.Provider>
  );
};