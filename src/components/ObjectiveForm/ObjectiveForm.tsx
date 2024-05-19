import { EObjectiveType } from "@/constants/enums";
import React from "react";
import { Title } from "..";

export interface ObjetiveFormProps {}

/**
 * Choose the objective of the model.
 */
const ObjetiveForm: React.FC<ObjetiveFormProps> = () => {
  // TODO: Save the selected option in the context.
  /* const {} = useContext(AppContext); */

  return (
    <div className="flex items-center gap-5">
      <Title>Objetivo: </Title>
      <select
        className="text-sm py-1 px-2 rounded-lg bg-white bg-opacity-80 transition-colors duration-200 hover:bg-opacity-100 focus:outline-none"
        defaultValue={EObjectiveType.MAX}
      >
        <option value={EObjectiveType.MAX}>Maximizar</option>
        <option value={EObjectiveType.MIN}>Minimizar</option>
      </select>
    </div>
  );
};

export default ObjetiveForm;
