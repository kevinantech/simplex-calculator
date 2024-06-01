import { EVariableType } from "@/constants";
import { Term } from "./term.model";

export const getBasicVariables = (standardizedObjectiveFunction: Term[]): Term[] => {
  const slackVariables = standardizedObjectiveFunction
    .filter((term) => term.type === EVariableType.SLACK)
    .map((term) => ({ ...term }));

  const artificialVariables = standardizedObjectiveFunction
    .filter((term) => term.type === EVariableType.ARTIFICIAL)
    .map((term) => ({ ...term }));

  const basicVariables = slackVariables.map((slackTerm) => {
    const artificialVariable = artificialVariables.find(
      (artificialTerm) => slackTerm.subindex === artificialTerm.subindex
    );

    if (artificialVariable) return { ...artificialVariable };
    return { ...slackTerm };
  });

  return basicVariables;
};
