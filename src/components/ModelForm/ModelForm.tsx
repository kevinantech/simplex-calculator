import {
  Button,
  ConstraintField,
  ObjectiveField,
  ObjectiveFunctionField,
} from "@/components";
import { EConstraintType, EObjectiveType, EVariableType } from "@/constants";
import { AppContext } from "@/contexts/app.context";
import { generateObjectiveFunction } from "@/core/generateObjectiveFunction";
import { Term } from "@/core/term.model";
import React, { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "rsuite";

export const parentKeyObjectiveFunction = "objectiveFunction";
export const parentKeyConstraints = "constraints";
export const keyConstraintType = "type";

export type ModelFormType = {
  objective: EObjectiveType;
  [parentKeyObjectiveFunction]: {
    [key: string]: number;
  };
  [parentKeyConstraints]: ({
    [key: string]: number;
  } & {
    [keyConstraintType]: EConstraintType;
    [EVariableType.LIMIT]: number; // INDICA EL LIMITE DE LA RESTRICCION
  })[];
};

const generateConstraintIds = (length: number): number[] => {
  const constraintIds: number[] = [];
  for (let i = 0; i < length; i++) constraintIds[i] = i;
  return constraintIds;
};

export interface ModelFormProps {}

const ModelForm: React.FC<ModelFormProps> = () => {
  const { numberOfVariables, numberOfConstraints, simplex } = useContext(AppContext);

  // Contiene las variables no basicas de la funcion objetivo de manera inicial.
  const objectiveFunctionRender = useMemo<Term[]>(
    () => generateObjectiveFunction(numberOfVariables.value),
    []
  );
  const constraintIds = useMemo<number[]>(
    () => generateConstraintIds(numberOfConstraints.value),
    []
  );
  const { register, handleSubmit } = useForm<ModelFormType>();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <form
      className="flex flex-col mx-8 items-center py-8 px-10 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow-lg"
      onSubmit={handleSubmit((data) =>
        simplex.handleCalculation(data, objectiveFunctionRender)
      )}
    >
      <ObjectiveField {...register("objective", { required: true })} />
      <ObjectiveFunctionField register={register} terms={objectiveFunctionRender} />
      {constraintIds.map((constraintId) => (
        <ConstraintField
          key={`ConstraintField-${constraintId}`}
          constraintId={constraintId}
          register={register}
          terms={objectiveFunctionRender}
          numberOfContraint={constraintId + 1}
        />
      ))}
      <Button className="mt-8" type="submit">
        Calcular
      </Button>
      {loading && <Loader className="mt-4" size="sm" />}
    </form>
  );
};

export default ModelForm;
