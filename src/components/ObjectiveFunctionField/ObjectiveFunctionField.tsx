import { OFTerm } from "@/core/of-terms";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ModelFormType, Title, VarInput } from "..";
import { EVariableType } from "@/constants";

export interface ObjectiveFunctionFieldProps {
  register: UseFormRegister<ModelFormType>;
  terms: OFTerm[];
}

const ObjectiveFunctionField: React.FC<ObjectiveFunctionFieldProps> = ({
  terms,
  register,
}) => {
  return (
    <>
      <Title className="mt-8">Función Objetivo</Title>
      <div className="flex flex-wrap justify-center">
        {terms.map(({ key, subindex }) => {
          return (
            <VarInput
              className="mt-5"
              addition={subindex > 1 ? "left" : undefined}
              key={key}
              subindex={subindex}
              variableType={EVariableType.NON_BASIC}
              {...register(["ofTerms", key].join("."), {
                setValueAs: (value) => Number(value),
              })}
            />
          );
        })}
      </div>
    </>
  );
};

export default ObjectiveFunctionField;
