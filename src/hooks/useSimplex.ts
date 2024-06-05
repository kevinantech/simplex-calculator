import { ModelFormType } from "@/components";
import { EVariableType } from "@/constants";
import { getInitialTable, getIterations } from "@/core";
import { getStandardizedObjectiveFunction } from "@/core/getStandardizedObjectiveFunction";
import { Term } from "@/core/term.model";
import { useState } from "react";

export type TermOperated = {
  artificialValue: number;
  type: EVariableType;
  value: number;
};

export type Table = {
  id: string;
  basicVariables: Term[];
  cjzj: TermOperated[];
  standardizedConstraints: Term[][];
  zj: TermOperated[];
};

export type Simplex = {
  objectiveFunction: Term[];
  tables: Table[];
  /* solution: Term[]; */
};

const useSimplex = () => {
  const [simplex, setSimplex] = useState<Simplex>();

  const handleCalculation = (data: ModelFormType, objectiveFunctionRender: Term[]) => {
    const standardizedObjectiveFunction = getStandardizedObjectiveFunction(
      data,
      objectiveFunctionRender
    );

    const { tables } = getIterations(
      data.objective,
      getInitialTable(data, standardizedObjectiveFunction)
    );

    console.log({ tables });

    setSimplex({
      objectiveFunction: standardizedObjectiveFunction,
      tables,
    });
  };

  return {
    handleCalculation,
    simplex,
  };
};

export default useSimplex;
