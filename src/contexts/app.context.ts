import { createContext } from "react";

export type ContextValue = {
  numberOfVariables: {
    value: number;
    dispatch: (payload: number) => void;
  };
  numberOfConstraints: {
    value: number;
    dispatch: (payload: number) => void;
  };
};

export const AppContext = createContext({} as ContextValue);
