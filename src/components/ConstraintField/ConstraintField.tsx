import { OFTerm } from "@/core/of-terms";
import React, { memo } from "react";
import { UseFormRegister } from "react-hook-form";
import { ConstraintSelect, ModelFormType, Title, VarInput } from "..";
import { EVariableType } from "@/constants";

export interface ConstraintsFieldProps {
  register: UseFormRegister<ModelFormType>;
  numberOfContraint: number;
  terms: OFTerm[];
}

const ConstraintField: React.FC<ConstraintsFieldProps> = ({
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
              {...register(["constraints", numberOfContraint, key].join("."), {
                setValueAs: (value) => Number(value),
              })}
            />
          );
        })}
        <ConstraintSelect
          className="mt-5"
          {...register(["constraints", numberOfContraint, "type"].join("."))}
        />
        <VarInput
          className="mt-5"
          subindex={numberOfContraint}
          variableType={EVariableType.LIMIT}
          {...register(
            ["constraints", numberOfContraint, EVariableType.LIMIT].join("."),
            {
              setValueAs: (value) => Number(value),
            }
          )}
        />
      </div>
    </>
  );
};

export default memo(ConstraintField);
