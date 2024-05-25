import { EVariableType } from "@/constants";
import { OFTerm } from "@/core/of-terms";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ConstraintSelect, ModelFormType, Title, VarInput } from "..";

export interface ConstraintsFieldProps {
  constraintId: number;
  numberOfContraint: number;
  register: UseFormRegister<ModelFormType>;
  terms: OFTerm[];
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
              {...register(["constraints", constraintId, key].join("."), {
                setValueAs: (value) => Number(value),
              })}
            />
          );
        })}
        <ConstraintSelect
          className="mt-5"
          {...register(["constraints", constraintId, "type"].join("."))}
        />
        <VarInput
          className="mt-5"
          subindex={numberOfContraint}
          variableType={EVariableType.LIMIT}
          {...register(["constraints", constraintId, EVariableType.LIMIT].join("."), {
            setValueAs: (value) => Number(value),
          })}
        />
      </div>
    </>
  );
};

export default ConstraintField;
