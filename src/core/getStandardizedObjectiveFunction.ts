import { ModelFormType } from "@/components";
import { Term, createTerm } from "./term.model";
import { EConstraintType, EObjectiveType, EVariableType } from "@/constants";

export const getStandardizedObjectiveFunction = (
  { constraints, objective, objectiveFunction }: ModelFormType,
  objectiveFunctionRender: Term[]
) => {
  /**
   * Añade los coeficientes de las variable de decisión a la funcion objetivo.
   */
  const decisionVariables = objectiveFunctionRender.map((term) => ({
    ...term,
    coefficient: objectiveFunction[term.key],
  }));

  const aux: Term[] = [];
  /**
   * Añade las variables de holgura a la funcion objetivo.
   */
  constraints.forEach(({ type }, index) => {
    const constraintNumber = index + 1;
    if (type === EConstraintType.MORE || type === EConstraintType.LESS)
      aux.push(createTerm(EVariableType.SLACK, constraintNumber));
  });

  /**
   * Añade las variables de artificial a la funcion objetivo.
   */
  constraints.forEach(({ type }, index) => {
    const constraintNumber = index + 1;
    if (type === EConstraintType.MORE || type === EConstraintType.EQUAL)
      aux.push(
        createTerm(
          EVariableType.ARTIFICIAL,
          constraintNumber,
          objective === EObjectiveType.MIN ? 1 : -1
        )
      );
  });

  return [...decisionVariables, ...aux];
};
