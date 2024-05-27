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
    const newObjectiveFunction = [...objectiveFunctionMemo];
    const newConstraints: Term[][] = [];

    /**
     * Añade los coeficientes a las variables no basicas.
     */
    for (const key in objectiveFunctionFromData) {
      for (const term of newObjectiveFunction) {
        if (key === term.key) term.setCoefficient(objectiveFunctionFromData[key]);
      }
    }

    /**
     * Añade las variables artificiales y de holgura a la funcion objetivo.
     */
    if (objective === EObjectiveType.MAX) {
      constraints.forEach(({ type }, index) => {
        const constraintNumber = index + 1;

        if (type === EConstraintType.LESS) {
          newObjectiveFunction.push(new Term(EVariableType.SLACK, constraintNumber));
        }
        if (type === EConstraintType.MORE) {
          newObjectiveFunction.push(new Term(EVariableType.SLACK, constraintNumber));
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

    /**
     * Estandariza las restricciones
     */

    for (const { K, type, ...nonBasicVariables } of constraints) {
      const constraint: Term[] = [...objectiveFunctionMemo];

      /**
       * Añade los coeficientes de las variables no basicas en cada restricción.
       */
      for (const key in nonBasicVariables) {
        for (const term of constraint) {
          if (key === term.key) term.setCoefficient(nonBasicVariables[key]);
        }
      }

      /**
       * Añade los coeficientes de las variables basicas a las restricciones;
       */
      const auxiliaryVariables = newObjectiveFunction.filter(
        (newObjectiveFunctionTerm) => {
          const condition =
            objectiveFunctionMemo.some(
              (initialObjectiveFunctionTerm) =>
                initialObjectiveFunctionTerm.key === newObjectiveFunctionTerm.key
            ) === false;
          return condition;
        }
      );

      newConstraints.push();
    }

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
