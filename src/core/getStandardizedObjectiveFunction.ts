import { ModelFormType } from "@/components";
import { Term, createTerm } from "./term.model";
import { EConstraintType, EObjectiveType, EVariableType } from "@/constants";

export const getStandardizedObjectiveFunction = (
  { constraints, objective }: ModelFormType,
  objectiveFunction: Term[]
) => {
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

  return [
    ...objectiveFunction.map((term) => ({ ...term })),
    ...aux.map((term) => ({ ...term })),
  ];
};
