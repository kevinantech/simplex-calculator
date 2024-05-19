import { OFTerm } from "@/core/of-terms";
import React from "react";
import { useForm } from "react-hook-form";
import { Title, VarInput } from "..";

type DynamicObject = { [key: string]: number };

export interface ObjectiveFunctionFormProps {
  terms: OFTerm[];
}

const ObjectiveFunctionForm: React.FC<ObjectiveFunctionFormProps> = ({ terms }) => {
  // Por defecto los coeficientes de las variables son 0.
  const defaultValues = terms.reduce((acc: DynamicObject, { key }) => {
    acc[key] = 0;
    return acc;
  }, {});

  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((data) => {
        console.log("🚀 data:", data);
      })}
    >
      <Title>Función Objetivo</Title>
      <div className="flex flex-wrap">
        {terms.map(({ key, subindex }) => {
          return (
            <VarInput
              className="mt-5"
              addition={subindex > 1 ? "left" : undefined}
              key={key}
              subindex={subindex}
              {...register(key, { setValueAs: (value) => Number(value) })}
            />
          );
        })}
      </div>
      <Title className="mt-5">Restricciones</Title>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ObjectiveFunctionForm;
