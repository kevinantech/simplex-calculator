import { Simplex } from "@/hooks/useSimplex";
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
  simplex:
    | {
        value: Simplex;
        dispatch: (payload: Simplex) => void;
      }
    | undefined;
};

export const AppContext = createContext({} as ContextValue);
