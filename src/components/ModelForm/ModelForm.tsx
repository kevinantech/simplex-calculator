import {
  Button,
  ConstraintField,
  ObjectiveField,
  ObjectiveFunctionField,
} from "@/components";
import { EConstraintType, EObjectiveType, EVariableType } from "@/constants";
import { AppContext } from "@/contexts/app.context";
import { Term } from "@/core/term.model";
import React, { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";

export const parentKeyObjectiveFunction = "objectiveFunction";
export const parentKeyConstraints = "constraints";
export const keyConstraintType = "type";

export type ModelFormType = {
  objective: EObjectiveType;
  [parentKeyObjectiveFunction]: {
    [key: string]: number | string;
  };
  [parentKeyConstraints]: ({
    [key: string]: number;
  } & {
    [keyConstraintType]: EConstraintType;
  })[];
};

/* OFTerms = Objective Function Terms */
const generateObjectiveFunction = (length: number): Term[] => {
  const terms: Term[] = [];
  for (let i = 1; i <= length; i++) {
    const term = new Term(EVariableType.NON_BASIC, i);
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
  const objectiveFunctionMemo = useMemo<Term[]>(
    () => generateObjectiveFunction(numberOfVariables.value),
    []
  );
  const constraintIds = useMemo<number[]>(
    () => generateConstraintIds(numberOfConstraints.value),
    []
  );
  const { register, handleSubmit } = useForm<ModelFormType>();

  return (
    <form
      className="flex flex-col mx-8 items-center py-8 px-10 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow-lg"
      onSubmit={handleSubmit(
        (data) => {
          console.log("data: ", { data });

          const {
            constraints,
            objectiveFunction: objectiveFunctionFromData,
            objective,
          } = data;

          const newObjectiveFunction = [...objectiveFunctionMemo];

          /**
           * Añade los coeficientes a las variables no basicas.
           */
          for (const key in objectiveFunctionFromData) {
            for (const term of objectiveFunctionMemo) {
              if (key === term.key)
                term.setCoefficient(objectiveFunctionFromData[key] as number);
            }
          }

          /**
           * Añade las variables de holgura a la funcion objetivo.
           */
          if (objective === EObjectiveType.MAX) {
            constraints.forEach(({ type }, index) => {
              const constraintNumber = index + 1;

              if (type === EConstraintType.LESS) {
                newObjectiveFunction.push(
                  new Term(EVariableType.SLACK, constraintNumber)
                );
              }
              if (type === EConstraintType.MORE) {
                newObjectiveFunction.push(
                  new Term(EVariableType.SLACK, constraintNumber)
                );
                newObjectiveFunction.push(
                  new Term(EVariableType.ARTIFICIAL, constraintNumber, -1, true)
                );
              }
              if (type === EConstraintType.EQUAL) {
                newObjectiveFunction.push(
                  new Term(EVariableType.ARTIFICIAL, constraintNumber, -1, true)
                );
              }
            });
          }

          // Log: Funcion objetivo estandarizada
          console.log("newObjectiveFunction", { newObjectiveFunction });

          /* constraints.forEach((constraint, index) => {
            const constraintNumber = index + 1;

            if (objective === EObjectiveType.MAX)
              objectiveFunctionMemo[
                EVariableType.SLACK + termDelimiter + constraintNumber
              ] = 0;
            else if (objective === EObjectiveType.MIN)
              objectiveFunctionMemo[
                EVariableType.SLACK + termDelimiter + constraintNumber
              ] = 0;
          }); */
        },
        () => {}
      )}
    >
      <ObjectiveField {...register("objective", { required: true })} />
      <ObjectiveFunctionField register={register} terms={objectiveFunctionMemo} />
      {constraintIds.map((constraintId) => (
        <ConstraintField
          key={`ConstraintField-${constraintId}`}
          constraintId={constraintId}
          register={register}
          terms={objectiveFunctionMemo}
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
