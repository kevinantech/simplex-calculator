import { ModelFormType } from "@/components";
import { EVariableType } from "@/constants";
import { getInitialTable } from "@/core";
import { getStandardizedObjectiveFunction } from "@/core/getStandardizedObjectiveFunction";
import { Term } from "@/core/term.model";
import { useState } from "react";

export type TermOperated = {
  artificialValue: number;
  type: EVariableType;
  value: number;
};

export type Table = {
  basicVariables: Term[];
  cjzj: TermOperated[];
  standardizedConstraints: Term[][];
  zj: TermOperated[];
};

export type Simplex = {
  objectiveFunction: Term[];
  tables: Table[];
  solution: Term[];
};

const useSimplex = () => {
  const [simplex, setSimplex] = useState<Simplex>();

  const handleCalculation = (data: ModelFormType, objectiveFunctionRender: Term[]) => {
    const tables: Table[] = [];

    const standardizedObjectiveFunction = getStandardizedObjectiveFunction(
      data,
      objectiveFunctionRender
    );

    const initialTable = getInitialTable(data, standardizedObjectiveFunction);
    tables.push(initialTable);

    console.log("initialTable", {
      initialTable,
    });

    setSimplex({
      objectiveFunction: standardizedObjectiveFunction,
      solution: [],
      tables,
    });
  };

  return {
    handleCalculation,
    simplex,
  };
};

export default useSimplex;
