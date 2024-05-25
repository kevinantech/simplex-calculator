import {
  Button,
  ConstraintField,
  ObjectiveField,
  ObjectiveFunctionField,
} from "@/components";
import { EObjectiveType, EVariableType } from "@/constants";
import { AppContext } from "@/contexts/app.context";
import { OFTerm } from "@/core/of-terms";
import React, { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export type ModelFormType = {
  objective: EObjectiveType;
} & { [key: string]: number };

/* OFTerms = Objective Function Terms */
const genateOFTerms = (length: number): OFTerm[] => {
  const terms: OFTerm[] = [];
  for (let i = 1; i <= length; i++) {
    const term = new OFTerm(EVariableType.NON_BASIC, i);
    terms.push(term);
  }
  return terms;
};

const generateConstraintIds = (length: number): number[] => {
  const constraintIds: number[] = [];
  for (let i = 0; i < length; i++) constraintIds[i] = i;
  return constraintIds;
};

export interface ModelFormProps {}

const ModelForm: React.FC<ModelFormProps> = () => {
  const { numberOfVariables, numberOfConstraints } = useContext(AppContext);
  const ofTerms = useMemo<OFTerm[]>(() => genateOFTerms(numberOfVariables.value), []);
  const constraintIds = useMemo<number[]>(
    () => generateConstraintIds(numberOfConstraints.value),
    []
  );
  const { register, handleSubmit } = useForm<ModelFormType>();

  return (
    <form
      className="flex flex-col mx-8 items-center py-8 px-10 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow-lg"
      onSubmit={handleSubmit(
        (data) => console.log("data: ", { data }),
        () => {}
      )}
    >
      <ObjectiveField {...register("objective", { required: true })} />
      <ObjectiveFunctionField register={register} terms={ofTerms} />
      {constraintIds.map((constraintId) => (
        <ConstraintField
          key={`ConstraintField-${constraintId}`}
          constraintId={constraintId}
          register={register}
          terms={ofTerms}
          numberOfContraint={constraintId + 1}
        />
      ))}
      <Button className="mt-8" type="submit">
        Calcular
      </Button>
    </form>
  );
};

export default ModelForm;
