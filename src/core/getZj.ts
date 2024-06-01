import { SolutionTerm, TermsOperated } from "@/hooks/useSimplex";
import { Term } from "./term.model";
import { EVariableType } from "@/constants";

export const getZj = (
  constraintsResults: SolutionTerm[],
  standardizedConstraints: Term[][],
  basicVariables: Term[]
): TermsOperated[] => {
  const zj: TermsOperated[] = [];

  for (let column = 0; column < standardizedConstraints[0].length; column++) {
    const sum: TermsOperated = basicVariables.reduce(
      (acc: TermsOperated, basicTerm, row) => {
        const constraintTerm = standardizedConstraints[row][column];
        const result = constraintTerm.coefficient * basicTerm.coefficient;

        if (basicTerm.type === EVariableType.ARTIFICIAL)
          acc = {
            ...acc,
            artificialValue: acc.artificialValue + result,
          };
        else {
          acc = {
            ...acc,
            value: acc.value + result,
          };
        }

        return acc;
      },
      { artificialValue: 0, value: 0 }
    );
    zj.push(sum);
  }

  const constraintsResultsZj = basicVariables.reduce(
    (acc: TermsOperated, basicTerm, column) => {
      const constraintResultTerm = constraintsResults[column];
      const result = constraintResultTerm.coefficient * basicTerm.coefficient;
      const isOneArtificial = basicTerm.type === EVariableType.ARTIFICIAL;

      if (isOneArtificial)
        acc = {
          ...acc,
          artificialValue: acc.artificialValue + result,
        };
      else {
        acc = {
          ...acc,
          value: acc.value + result,
        };
      }

      return acc;
    },
    { artificialValue: 0, value: 0 }
  );

  zj.unshift(constraintsResultsZj);
  return zj;
};
