import { AppContext } from "@/contexts/app.context";
import { generateKey } from "@/utils";
import React, { useContext, useMemo } from "react";
import { Title, VarInput } from "..";
import { useForm } from "react-hook-form";

type DynamicObject = { [key: string]: number };

const generateKeys = (length: number): string[] => {
  const keys: string[] = [];
  for (let i = 0; i < length; i++) keys.push(generateKey());
  return keys;
};

export interface ObjectiveFunctionFormProps {}

const ObjectiveFunctionForm: React.FC<ObjectiveFunctionFormProps> = () => {
  const { numberOfVariables } = useContext(AppContext);
  const keys = useMemo(() => generateKeys(numberOfVariables.value), []);

  // Por defecto los coeficientes de las variables son 0.
  const defaultValues = keys.reduce((acc: DynamicObject, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  const { register } = useForm({ defaultValues });

  return (
    <div>
      <Title>Función Objetivo</Title>
      <div className="flex flex-wrap">
        {keys.map((key, index) => {
          return (
            <VarInput
              className="mt-5"
              addition={index > 0 ? "left" : undefined}
              key={key}
              subindex={index + 1}
              {...register(key)}
            />
          );
        })}
      </div>
      <Title className="mt-5">Restricciones</Title>
    </div>
  );
};

export default ObjectiveFunctionForm;
