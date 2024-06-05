import { EObjective } from "@/constants";
import { TermOperated } from "@/hooks/useSimplex";

export const optimalityTest = (objective: EObjective, cjzj: TermOperated[]) =>
  objective === EObjective.MAX
    ? cjzj.every(({ value, artificialValue }) => value <= 0 && artificialValue <= 0)
    : cjzj.every(({ value, artificialValue }) => value >= 0 && artificialValue >= 0);
