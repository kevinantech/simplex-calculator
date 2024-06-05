import { EObjective } from "@/constants/enums";
import React from "react";
import { Title } from "..";

export interface ObjetiveFieldProps {
  onBlur: (event: React.FocusEvent<HTMLSelectElement, Element>) => void;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}

/**
 * Choose the objective of the model.
 */
const ObjetiveField = React.forwardRef<HTMLSelectElement, ObjetiveFieldProps>(
  ({ name, onBlur, onChange }, ref) => {
    return (
      <div className="flex items-center gap-5">
        <Title>Objetivo: </Title>
        <select
          className="text-sm py-1 px-4 rounded-full bg-white bg-opacity-75 transition-colors duration-200 hover:bg-opacity-100 focus:outline-none"
          defaultValue={EObjective.MAX}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
        >
          <option value={EObjective.MAX}>Maximizar</option>
          <option value={EObjective.MIN}>Minimizar</option>
        </select>
      </div>
    );
  }
);

export default ObjetiveField;
