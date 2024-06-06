import { EObjective } from "@/constants";
import { Table } from "@/hooks/useSimplex";
import { Term } from ".";
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
  objective: EObjective,
  initial: Table
): GetIterationsReturn => {
  const tables: Table[] = [{ ...initial }];
  const solution: Term[] = [];
  let error: SimplexError | undefined = undefined;

  let index: number = 0;
  do {
    const pivotColumn = getPivotColumn(objective, tables[index].cjzj);
    if (pivotColumn === -1) error = SimplexError.COLUMN;

    const pivotRow = getPivotRow(tables[index].standardizedConstraints, pivotColumn);
    if (pivotRow === -1) error = SimplexError.COLUMN;

    index++;
  } while (!error);

  return {
    tables,
    solution,
  };
};
