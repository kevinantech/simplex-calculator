import { ModelFormType } from "@/components";
import { EConstraintType, EVariableType } from "@/constants";
import { Term } from "./term.model";
import { SolutionTerm } from "@/hooks/useSimplex";

export const getStandardizedConstraints = (
  { constraints }: ModelFormType,
  objectiveFunction: Term[],
  standardizedObjectiveFunction: Term[]
): {
  standardizedConstraints: Term[][];
  constraintsResults: SolutionTerm[];
} => {
  const standardizedConstraints: Term[][] = [];
  const constraintsResults: SolutionTerm[] = [];
  const aux = standardizedObjectiveFunction.filter((term) =>
    objectiveFunction.every((decisionTerm) => decisionTerm.key !== term.key)
  );

  /**
   * Estandariza las restricciones
   */
  let constraintNumber: number = 1;
  for (const { K, type, ...decisionVariables } of constraints) {
    /**
     * Añade los coeficientes de las variables de decisión para cada restricción.
     */
    const constraint = objectiveFunction.map((term) => ({
      ...term,
      coefficient: decisionVariables[term.key],
    }));

    /**
     * Añade los coeficientes de las variables auxiliares las restricciones;
     */
    constraint.push(
      ...aux.map((term) => {
        type CoefficientValue = -1 | 0 | 1;
        let coefficient: CoefficientValue = 0;
        if (term.subindex === constraintNumber) {
          if (type === EConstraintType.LESS) coefficient = 1;
          else if (type === EConstraintType.MORE && term.type === EVariableType.SLACK)
            coefficient = -1;
          else if (
            type === EConstraintType.MORE &&
            term.type === EVariableType.ARTIFICIAL
          )
            coefficient = 1;

          if (type === EConstraintType.EQUAL && term.type === EVariableType.ARTIFICIAL)
            coefficient = 1;
        }

        return { ...term, coefficient };
      })
    );

    standardizedConstraints.push(constraint);
    constraintsResults.push({
      coefficient: K,
      subindex: constraintNumber,
    });
    constraintNumber++;
  }

  return {
    standardizedConstraints,
    constraintsResults,
  };
};
