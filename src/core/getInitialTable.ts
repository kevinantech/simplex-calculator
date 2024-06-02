import { ModelFormType } from "@/components";
import { Table } from "@/hooks/useSimplex";
import { Term, getBasicVariables, getCjZj, getStandardizedConstraints, getZj } from ".";

export const getInitialTable = (
  data: ModelFormType,
  standardizedObjectiveFunction: Term[]
): Table => {
  const { standardizedConstraints } = getStandardizedConstraints(
    data,
    standardizedObjectiveFunction
  );

  const basicVariables = getBasicVariables(standardizedObjectiveFunction);
  const zj = getZj(standardizedConstraints, basicVariables);
  const cjzj = getCjZj(standardizedObjectiveFunction, zj);

  return {
    basicVariables,
    cjzj,
    standardizedConstraints,
    zj,
  };
};
