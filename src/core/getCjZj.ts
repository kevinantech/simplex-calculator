import { TermOperated } from "@/hooks/useSimplex";
import { Term } from "./term.model";
import { EVariableType } from "@/constants";

export const getCjZj = (
  objectiveFunction: Term[],
  zj: TermOperated[]
): TermOperated[] => {
  const cjZj: TermOperated[] = objectiveFunction.map((term, index) => {
    const currentZj = { ...zj[index] };

    const formattedTerm: TermOperated = {
      artificialValue: term.type === EVariableType.ARTIFICIAL ? term.coefficient : 0,
      value: term.type !== EVariableType.ARTIFICIAL ? term.coefficient : 0,
      type: term.type,
    };

    return {
      artificialValue: formattedTerm.artificialValue - currentZj.artificialValue,
      value: formattedTerm.value - currentZj.value,
      type: term.type,
    };
  });

  return cjZj;
};
