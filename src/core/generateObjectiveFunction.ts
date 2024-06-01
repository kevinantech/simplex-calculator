import { EVariableType } from "@/constants";
import { Term, createTerm } from "./term.model";

/**
 * Genera los termnios de la función objetivo a partir de un numbero de variables.
 * @param numberOfVariables
 * @returns
 */
export const generateObjectiveFunction = (numberOfVariables: number): Term[] => {
  const terms: Term[] = [];
  for (let i = 1; i <= numberOfVariables; i++)
    terms.push(createTerm(EVariableType.NON_BASIC, i));
  return terms;
};
