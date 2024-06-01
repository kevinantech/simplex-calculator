import { ModelFormType } from "@/components";
import { getStandardizedConstraints } from "@/core/getStandardizedConstraints";
import { getStandardizedObjectiveFunction } from "@/core/getStandardizedObjectiveFunction";
import { mapObjectiveFunctionFieldToTerms } from "@/core/mapObjectiveFunctionFieldToTerms";
import { Term } from "@/core/term.model";

export type SolutionTerm = {
  coefficient: number;
  subindex: number;
};

export type TermsOperated = {
  coefficient: number;
  isArtificial: boolean;
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
    const objectiveFunction = mapObjectiveFunctionFieldToTerms(
      data,
      objectiveFunctionRender
    );

    const standardizedObjectiveFunction = getStandardizedObjectiveFunction(
      data,
      objectiveFunction
    );

    const { standardizedConstraints, constraintsResults } = getStandardizedConstraints(
      data,
      objectiveFunction,
      standardizedObjectiveFunction
    );

    console.log("standardizedObjectiveFunction", { standardizedObjectiveFunction });
    console.log("standardizedConstraints", { standardizedConstraints });
    console.log("constraintsResults", { constraintsResults });
  };

  return {
    handleCalculation,
  };
};

export default useSimplex;
