import { ModelFormType } from "@/components";
import { getBasicVariables } from "@/core/getBasicVariables";
import { getStandardizedConstraints } from "@/core/getStandardizedConstraints";
import { getStandardizedObjectiveFunction } from "@/core/getStandardizedObjectiveFunction";
import { getZj } from "@/core/getZj";
import { Term } from "@/core/term.model";

export type SolutionTerm = {
  coefficient: number;
  subindex: number;
};

export type TermsOperated = {
  value: number;
  artificialValue: number;
};

export type Table = {
  constraints: Term[][];
  solutions: SolutionTerm[];
  basicVariables: Term[];
  zj: TermsOperated[];
  cjzj: TermsOperated[];
};

export type Simplex = {
  objectiveFunction: Term[];
  tables: Table[];
  solution: Term[];
};

const useSimplex = () => {
  const handleCalculation = (data: ModelFormType, objectiveFunctionRender: Term[]) => {
    const standardizedObjectiveFunction = getStandardizedObjectiveFunction(
      data,
      objectiveFunctionRender
    );
    const { standardizedConstraints, constraintsResults } = getStandardizedConstraints(
      data,
      standardizedObjectiveFunction
    );
    const basicVariables = getBasicVariables(standardizedObjectiveFunction);

    const zj = getZj(constraintsResults, standardizedConstraints, basicVariables);

    console.log("standardizedObjectiveFunction", {
      standardizedObjectiveFunction,
    });
    console.log("standardizedConstraints", { standardizedConstraints });
    console.log("constraintsResults", { constraintsResults });
    console.log("basicVariables", { basicVariables });
    console.log("zj", { zj });
  };

  return {
    handleCalculation,
  };
};

export default useSimplex;
