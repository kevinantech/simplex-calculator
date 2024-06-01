import { EVariableType } from "@/constants";

export type Term = {
  coefficient: number;
  readonly key: string;
  readonly type: EVariableType;
  readonly subindex: number;
};

export const createTerm = (
  type: EVariableType,
  subindex: number,
  coefficient: number = 0
): Term => ({
  coefficient,
  key: `${type}-${subindex}`,
  subindex,
  type,
});
