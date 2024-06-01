import {
  Button,
  ConstraintField,
  ObjectiveField,
  ObjectiveFunctionField,
} from "@/components";
import { EConstraintType, EObjectiveType, EVariableType } from "@/constants";
import { AppContext, LimitTerm } from "@/contexts/app.context";
import { Term, createTerm } from "@/core/term.model";
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

const generateObjectiveFunction = (length: number): Term[] => {
  const terms: Term[] = [];
  for (let i = 1; i <= length; i++) terms.push(createTerm(EVariableType.NON_BASIC, i));
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
  const toggleLoader = () => setLoading((prevState) => !prevState);

  const handleCalculation = async (data: ModelFormType) => {
    const { constraints, objectiveFunction: objectiveFunctionFromData, objective } = data;
    const newConstraints: Term[][] = [];
    const limits: LimitTerm[] = [];
    toggleLoader();

    setTimeout(() => {
      toggleLoader();
    }, 5000);

    /**
     * Añade los coeficientes a las variables de decisión de la función objetivo.
     */
    const objectiveFunction: Term[] = objectiveFunctionRender.map((term) => ({
      ...term,
      coefficient: objectiveFunctionFromData[term.key],
    }));

    const aux: Term[] = [];
    /**
     * Añade las variables de holgura a la funcion objetivo.
     */
    constraints.forEach(({ type }, index) => {
      const constraintNumber = index + 1;
      if (type === EConstraintType.MORE || type === EConstraintType.LESS)
        aux.push(createTerm(EVariableType.SLACK, constraintNumber));
    });

    /**
     * Añade las variables de artificial a la funcion objetivo.
     */
    constraints.forEach(({ type }, index) => {
      const constraintNumber = index + 1;
      if (type === EConstraintType.MORE || type === EConstraintType.EQUAL)
        aux.push(
          createTerm(
            EVariableType.ARTIFICIAL,
            constraintNumber,
            objective === EObjectiveType.MIN ? 1 : -1
          )
        );
    });

    objectiveFunction.push(...aux);

    /**
     * Estandariza las restricciones
     */
    let constraintNumber: number = 1;
    for (const { K, type, ...decisionVariables } of constraints) {
      /**
       * Añade los coeficientes de las variables de decisión para cada restricción.
       */
      const constraint = objectiveFunctionRender.map((term) => ({
        ...term,
        coefficient: decisionVariables[term.key],
      }));

      /**
       * Añade los coeficientes de las variables auxiliares las restricciones;
       */
      constraint.push(
        ...aux.map((term) => {
          type CoefficientValue = -1 | 0 | 1;
          let coefficient: CoefficientValue = 0;

          if (term.subindex === constraintNumber) {
            if (type === EConstraintType.LESS) coefficient = 1;
            else if (type === EConstraintType.MORE && term.type === EVariableType.SLACK)
              coefficient = -1;
            else if (
              type === EConstraintType.MORE &&
              term.type === EVariableType.ARTIFICIAL
            )
              coefficient = 1;

            if (type === EConstraintType.EQUAL && term.type === EVariableType.ARTIFICIAL)
              coefficient = 1;
          }

          return { ...term, coefficient };
        })
      );

      newConstraints.push(constraint);
      limits.push({ coefficient: K, subindex: constraintNumber });
      constraintNumber++;
    }

    console.log("newObjectiveFunction", { newObjectiveFunction: objectiveFunction });
    console.log("newConstraints", { newConstraints });
    console.log("limits", { limits });
    /* toggleLoader(); */
  };

  return (
    <form
      className="flex flex-col mx-8 items-center py-8 px-10 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow-lg"
      onSubmit={handleSubmit(handleCalculation, () => {})}
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
