import { Table } from "@/hooks/useSimplex";
import { Term } from ".";
import { EObjective } from "@/constants";
import { optimalityTest } from "./optimalityTest";
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

  const pivotColumn = getPivotColumn(objective, initial.cjzj);
  const pivotRow = getPivotRow(initial.standardizedConstraints, pivotColumn);

  console.log({ pivotColumn, pivotRow });

  while (/* !optimalityTest(objective, getCjZjFromLastTable()) || !error */ error) {
    /* TODO: Buscar el CjZj mas positivo en caso max y min */
    error = SimplexError.COLUMN;
  }
  return {
    tables,
    solution,
  };
};
