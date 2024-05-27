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
    [key: string]: number;
  };
  [parentKeyConstraints]: ({
    [key: string]: number;
  } & {
    [keyConstraintType]: EConstraintType;
    [EVariableType.LIMIT]: number; // INDICA EL LIMITE DE LA RESTRICCION
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

  // Contiene las variables no basicas de la funcion objetivo de manera inicial.
  const objectiveFunctionMemo = useMemo<Term[]>(
    () => generateObjectiveFunction(numberOfVariables.value),
    []
  );
  const constraintIds = useMemo<number[]>(
    () => generateConstraintIds(numberOfConstraints.value),
    []
  );
  const { register, handleSubmit } = useForm<ModelFormType>();

  const handleCalculation = (data: ModelFormType) => {
    console.log("data: ", { data });
    const { constraints, objectiveFunction: objectiveFunctionFromData, objective } = data;
    const newConstraints: Term[][] = [];

    /**
     * Añade los coeficientes a las variables no basicas.
     */
    const newObjectiveFunction: Term[] = objectiveFunctionMemo.map((term) => {
      for (const key in objectiveFunctionFromData) {
        if (term.key === key) term.setCoefficient(objectiveFunctionFromData[key]);
      }
      return term.clone();
    });

    /**
     * Añade las variables artificiales y de holgura a la funcion objetivo.
     * TODO: Hacer lo mismo para la minimizacion.
     */
    const auxiliaryVariables: Term[] = [];
    if (objective === EObjectiveType.MAX) {
      constraints.forEach(({ type }, index) => {
        const constraintNumber = index + 1;

        if (type === EConstraintType.LESS) {
          auxiliaryVariables.push(new Term(EVariableType.SLACK, constraintNumber));
        } else if (type === EConstraintType.MORE) {
          auxiliaryVariables.push(new Term(EVariableType.SLACK, constraintNumber));
          auxiliaryVariables.push(
            new Term(EVariableType.ARTIFICIAL, constraintNumber, -1, true)
          );
        } else if (type === EConstraintType.EQUAL) {
          auxiliaryVariables.push(
            new Term(EVariableType.ARTIFICIAL, constraintNumber, -1, true)
          );
        }
      });
    }

    newObjectiveFunction.push(...auxiliaryVariables);

    /**
     * Estandariza las restricciones
     */
    let constraintNumber: number = 1;
    for (const { K, type, ...nonBasicVariables } of constraints) {
      /**
       * Añade los coeficientes de las variables no basicas en cada restricción.
       */
      const constraint = objectiveFunctionMemo.map((term) => {
        for (const key in nonBasicVariables) {
          if (term.key === key) term.setCoefficient(nonBasicVariables[key]);
        }
        return term.clone();
      });

      /**
       * Añade los coeficientes de las variables auxiliares las restricciones;
       */
      if (type === EConstraintType.LESS) {
        constraint.push(new Term(EVariableType.SLACK, constraintNumber, 1));
      } else if (type === EConstraintType.MORE) {
        constraint.push(new Term(EVariableType.SLACK, constraintNumber, -1));
        constraint.push(new Term(EVariableType.ARTIFICIAL, constraintNumber, 1, true));
      } else if (type === EConstraintType.EQUAL) {
        constraint.push(new Term(EVariableType.ARTIFICIAL, constraintNumber, 1, true));
      }

      /**
       * Completa las variables auxiliares de la restriccion.
       */

      constraintNumber++;
      newConstraints.push(constraint);
    }

    console.log("newObjectiveFunction", { newObjectiveFunction });
    console.log("newConstraints", { newConstraints });
  };

  return (
    <form
      className="flex flex-col mx-8 items-center py-8 px-10 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow-lg"
      onSubmit={handleSubmit(handleCalculation, () => {})}
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
