import { Term } from "@/core/term.model";
import { createContext } from "react";

export type LimitTerm = {
  coefficient: number;
  subindex: number;
};

export type Standarization = {
  objectiveFunction: Term[];
  constraints: Term[][];
  limits: LimitTerm[];
};

export type ContextValue = {
  numberOfVariables: {
    value: number;
    dispatch: (payload: number) => void;
  };
  numberOfConstraints: {
    value: number;
    dispatch: (payload: number) => void;
  };
  standarization: Standarization | undefined;
};

export const AppContext = createContext({} as ContextValue);
