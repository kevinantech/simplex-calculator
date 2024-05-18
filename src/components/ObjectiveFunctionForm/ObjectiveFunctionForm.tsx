import { AppContext } from "@/contexts/app.context";
import { generateKey } from "@/utils";
import React, { useContext, useState } from "react";
import { Title, VarInput } from "..";

export interface ObjectiveFunctionFormProps {}

const generateKeys = (length: number): string[] => {
  const keys: string[] = [];
  for (let i = 0; i < length; i++) keys.push(generateKey());
  return keys;
};

const ObjectiveFunctionForm: React.FC<ObjectiveFunctionFormProps> = () => {
  const { numberOfVariables } = useContext(AppContext);
  const [keys] = useState(generateKeys(numberOfVariables.value));
  return (
    <div>
      <Title>Función Objetivo</Title>
      <div className="flex flex-wrap mt-5">
        {keys.map((key, index) => {
          return (
            <VarInput
              key={key}
              addition={index > 0 ? "left" : undefined}
              subindex={index + 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ObjectiveFunctionForm;
