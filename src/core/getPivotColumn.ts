import { EObjective } from "@/constants";
import { TermOperated } from "@/hooks/useSimplex";

type T = TermOperated & { index: number };

export const getPivotColumn = (
  objective: EObjective,
  reducedCostDifference: TermOperated[]
): number => {
  const mappedReducedCostDifference: T[] = reducedCostDifference.map(
    (termOperated, index) => ({ ...termOperated, index })
  );

  const reducedCostDifferenceWithM = mappedReducedCostDifference
    .filter(({ artificialValue }) =>
      objective === EObjective.MAX ? artificialValue > 0 : artificialValue < 0
    )
    .reduce((acc: T, item, index) => {
      if (index === 0) return item;
      return objective === EObjective.MAX
        ? item.artificialValue > acc.artificialValue
          ? item
          : item.artificialValue === acc.artificialValue && item.value > acc.value
          ? item
          : acc
        : item.artificialValue < acc.artificialValue
        ? item
        : item.artificialValue === acc.artificialValue && item.value < acc.value
        ? item
        : acc;
    });

  const reducedCostDifferenceWithoutM = mappedReducedCostDifference
    .filter(({ value }) => (objective === EObjective.MAX ? value > 0 : value < 0))
    .reduce((acc: T, item, index) => {
      if (index === 0) return item;
      return objective === EObjective.MAX
        ? item.value > acc.value
          ? item
          : acc
        : item.value < acc.value
        ? item
        : acc;
    });

  return reducedCostDifferenceWithM
    ? reducedCostDifferenceWithM.index
    : reducedCostDifferenceWithoutM
    ? reducedCostDifferenceWithoutM.index
    : -1; // Indica que no se pudo encontrar
};
