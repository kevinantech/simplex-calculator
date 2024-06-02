import { EVariableType } from "@/constants";
import { TermOperated } from "@/hooks/useSimplex";
import { Term } from "./term.model";

export const getZj = (
  standardizedConstraints: Term[][],
  basicVariables: Term[]
): TermOperated[] => {
  const zj: TermOperated[] = [];

  for (let column = 0; column < standardizedConstraints[0].length; column++) {
    const sum: TermOperated = basicVariables.reduce(
      (acc: TermOperated, basicTerm, row) => {
        const constraintTerm = standardizedConstraints[row][column];
        const result = constraintTerm.coefficient * basicTerm.coefficient;
        acc.type = constraintTerm.type;

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
      { artificialValue: 0, value: 0, type: EVariableType.NON_BASIC }
    );
    zj.push(sum);
  }

  return zj;
};
