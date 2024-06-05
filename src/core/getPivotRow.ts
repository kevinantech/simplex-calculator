import { Term } from "./term.model";

type CriteriaFactor = {
  value: number;
  index: number;
};

export const getPivotRow = (
  standardizedConstraints: Term[][],
  pivotColumnIndex: number
): number => {
  const criteriaFactors: CriteriaFactor[] = standardizedConstraints.map(
    (standardizedConstraint, index) => {
      const constraintResult =
        standardizedConstraint[standardizedConstraint.length - 1].coefficient;
      const elementFromPivotColumn = standardizedConstraint[pivotColumnIndex].coefficient;
      const output = constraintResult / elementFromPivotColumn;
      return isNaN(output) || !isFinite(output)
        ? {
            value: 0,
            index,
          }
        : {
            value: output,
            index,
          };
    }
  );

  const bestCriteriaFactor = criteriaFactors.reduce(
    (acc, criteriaFactor) => {
      if (criteriaFactor.value > acc.value) acc = criteriaFactor;
      return acc;
    },
    { index: -1, value: 0 } // Indica que no se pudo encontrar
  );

  return bestCriteriaFactor.index;
};
