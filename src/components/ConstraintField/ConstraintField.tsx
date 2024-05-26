import { EVariableType } from "@/constants";
import { Term } from "@/core/term.model";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import {
  ConstraintSelect,
  ModelFormType,
  Title,
  VarInput,
  keyConstraintType,
  parentKeyConstraints,
} from "..";

export interface ConstraintsFieldProps {
  constraintId: number;
  numberOfContraint: number;
  register: UseFormRegister<ModelFormType>;
  terms: Term[];
}

const ConstraintField: React.FC<ConstraintsFieldProps> = ({
  constraintId,
  register,
  numberOfContraint,
  terms,
}) => {
  return (
    <>
      <Title className="mt-8">{`Restricción ${numberOfContraint}`}</Title>
      <div className="flex flex-wrap justify-center">
        {terms.map(({ key, subindex }) => {
          return (
            <VarInput
              className="mt-5"
              addition={subindex > 1 ? "left" : undefined}
              key={key}
              subindex={subindex}
              variableType={EVariableType.NON_BASIC}
              {...register(
                [parentKeyConstraints, constraintId, key].join(
                  "."
                ) as keyof ModelFormType,
                {
                  setValueAs: (value) => Number(value),
                }
              )}
            />
          );
        })}
        <ConstraintSelect
          className="mt-5"
          {...register(
            [parentKeyConstraints, constraintId, keyConstraintType].join(
              "."
            ) as keyof ModelFormType
          )}
        />
        <VarInput
          className="mt-5"
          subindex={numberOfContraint}
          variableType={EVariableType.LIMIT}
          {...register(
            [parentKeyConstraints, constraintId, EVariableType.LIMIT].join(
              "."
            ) as keyof ModelFormType,
            {
              setValueAs: (value) => Number(value),
            }
          )}
        />
      </div>
    </>
  );
};

export default ConstraintField;
