import { ModelFormType } from "@/components";
import { Term } from "@/core";
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
  handleCalculation: (data: ModelFormType, objectiveFunctionRender: Term[]) => void;
};

export const AppContext = createContext({} as ContextValue);
