import { EObjective } from "@/constants";
import { TermOperated } from "@/hooks/useSimplex";

type T = TermOperated & { index: number };

/**
 * Halla la columna pivote segun el caso:
 * MAXIMIZACIÓN: Encuentra el valor mas positivo.
 * MINIMIZACIÓN: Encuentra el valor mas negativo.
 * @param objective
 * @param reducedCostDifference
 * @returns Indice de la columna pivote.
 */
export const getPivotColumn = (
  objective: EObjective,
  reducedCostDifference: TermOperated[]
): number => {
  const mappedReducedCostDifference: T[] = reducedCostDifference.map(
    (termOperated, index) => ({ ...termOperated, index })
  );

  /**
   * MAXIMIZACIÓN: Encuentra el valor de M mas positivo.
   * MINIMIZACIÓN: Encuentra el valor de M mas negativo.
   * Nota: En caso de que todos los valores de M sean 0, el reduce retornara un objeto vacio {}.
   */
  const bestReducedCostDifferenceByM = mappedReducedCostDifference
    .filter(({ artificialValue }) =>
      objective === EObjective.MAX ? artificialValue > 0 : artificialValue < 0
    )
    .reduce((previousValue: T, item, index) => {
      if (index === 0) return item;
      return objective === EObjective.MAX
        ? item.artificialValue > previousValue.artificialValue
          ? item
          : item.artificialValue === previousValue.artificialValue &&
            item.value > previousValue.value
          ? item
          : previousValue
        : item.artificialValue < previousValue.artificialValue
        ? item
        : item.artificialValue === previousValue.artificialValue &&
          item.value < previousValue.value
        ? item
        : previousValue;
    }, {} as T);

  /**
   * Si el valor de M fue 0 en todas las columnas, sucedera lo siguiente para cada caso:
   * MAXIMIZACIÓN: Encuentra el valor de la constante mas positiva.
   * MINIMIZACIÓN: Encuentra el valor de la constante mas negativa.
   * Nota: En caso de que todos los valores de M sean 0, el reduce retornara un objeto vacio {}.
   */
  const bestReducedCostDifference = bestReducedCostDifferenceByM.index
    ? bestReducedCostDifferenceByM
    : mappedReducedCostDifference
        .filter(({ value }) => (objective === EObjective.MAX ? value > 0 : value < 0))
        .reduce((previousValue: T, item, index) => {
          if (index === 0) return item;
          return objective === EObjective.MAX
            ? item.value > previousValue.value
              ? item
              : previousValue
            : item.value < previousValue.value
            ? item
            : previousValue;
        }, {} as T);

  console.log({ reducedCostDifference });

  return bestReducedCostDifference.index ? bestReducedCostDifference.index : -1; // Indica que no se pudo encontrar
};
