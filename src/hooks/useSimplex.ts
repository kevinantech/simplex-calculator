import { ModelFormType } from "@/components";
import { EVariableType } from "@/constants";
import { getBasicVariables } from "@/core/getBasicVariables";
import { getCjZj } from "@/core/getCjZj";
import { getStandardizedConstraints } from "@/core/getStandardizedConstraints";
import { getStandardizedObjectiveFunction } from "@/core/getStandardizedObjectiveFunction";
import { getZj } from "@/core/getZj";
import { Term } from "@/core/term.model";

export type SolutionTerm = {
  coefficient: number;
  subindex: number;
};

export type TermOperated = {
  artificialValue: number;
  type: EVariableType;
  value: number;
};

export type Table = {
  constraints: Term[][];
  solutions: SolutionTerm[];
  basicVariables: Term[];
  zj: TermOperated[];
  cjzj: TermOperated[];
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
    const { standardizedConstraints } = getStandardizedConstraints(
      data,
      standardizedObjectiveFunction
    );
    const basicVariables = getBasicVariables(standardizedObjectiveFunction);
    const zj = getZj(standardizedConstraints, basicVariables);
    const cjZj = getCjZj(standardizedObjectiveFunction, zj);

    console.log("standardizedObjectiveFunction", {
      standardizedObjectiveFunction,
    });
    console.log("standardizedConstraints", { standardizedConstraints });
    console.log("basicVariables", { basicVariables });
    console.log("zj", { zj });
    console.log("cjZj", { cjZj });
  };

  return {
    handleCalculation,
  };
};

export default useSimplex;
