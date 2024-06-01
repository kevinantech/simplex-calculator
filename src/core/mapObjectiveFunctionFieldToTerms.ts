import { ModelFormType } from "@/components";
import { Term } from "./term.model";

/**
 * Transforma los datos del formulario de la funcion objetivo.
 */
export const mapObjectiveFunctionFieldToTerms = (
  { objectiveFunction }: ModelFormType,
  objectiveFunctionRender: Term[]
): Term[] =>
  objectiveFunctionRender.map((term) => ({
    ...term,
    coefficient: objectiveFunction[term.key],
  }));
