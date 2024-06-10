import { ModelFormType } from "@/components";
import { Table } from "@/hooks/useSimplex";
import { getRandomKey } from "@/utils";
import { Term, getInitialTable } from ".";
import { getPivotColumn } from "./getPivotColumn";
import { getPivotRow } from "./getPivotRow";

type GetIterationsReturn = {
  solution: Term[];
  tables: Table[];
};

enum SimplexError {
  COLUMN = "column",
  ROW = "row",
}

export const getIterations = (
  data: ModelFormType,
  standardizedObjectiveFunction: Term[]
): GetIterationsReturn => {
  const tables: Table[] = [{ ...getInitialTable(data, standardizedObjectiveFunction) }];
  const solution: Term[] = [];
  let error: SimplexError | undefined = undefined;

  let tableIndex: number = 0;
  do {
    const currentTable = tables[tableIndex];

    const pivotColumn = getPivotColumn(data.objective, tables[tableIndex].cjzj);
    if (pivotColumn === -1) {
      error = SimplexError.COLUMN;
      continue;
    }
    const pivotRow = getPivotRow(currentTable.standardizedConstraints, pivotColumn);
    if (pivotRow === -1) {
      error = SimplexError.ROW;
      continue;
    }

    // Actualiza variables basicas.
    const newBasicVariables: Term[] = currentTable.basicVariables.map((term, index) =>
      index === pivotRow ? { ...standardizedObjectiveFunction[pivotColumn] } : { ...term }
    );

    // Hacer Gauss Jordan
    const newStandardizedConstraints = currentTable.standardizedConstraints.map(
      (standardizedConstraint) => standardizedConstraint.map((term) => ({ ...term }))
    );

    const simplificator: number =
      newStandardizedConstraints[pivotRow][pivotColumn].coefficient;

    if (simplificator > 1)
      newStandardizedConstraints[pivotRow].forEach(
        (term) => (term.coefficient /= simplificator)
      );

    tables.push({
      basicVariables: newBasicVariables,
      id: ["simplex-table", getRandomKey()].join("-"),
      cjzj: [],
      standardizedConstraints: [[]],
      zj: [],
    });
    tableIndex++;
  } while (!error);

  return {
    tables,
    solution,
  };
};
