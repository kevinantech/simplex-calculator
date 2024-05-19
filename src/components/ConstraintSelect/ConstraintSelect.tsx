import { EConstraintType } from "@/constants";
import React from "react";

export interface ConstraintSelectProps {
  className?: string;
  name: string;
  onBlur: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange: (event: React.FocusEvent<HTMLSelectElement, Element>) => void;
}

const ConstraintSelect = React.forwardRef<HTMLSelectElement, ConstraintSelectProps>(
  ({ className, name, onBlur, onChange }, ref) => {
    return (
      <select
        className={`px-3 mx-4 rounded-lg font-semibold text-lg bg-white bg-opacity-75 transition-colors duration-200 hover:bg-opacity-100 focus:outline-none ${
          className ?? ""
        }`}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
      >
        <option value={EConstraintType.LESS}>≤</option>
        <option value={EConstraintType.EQUAL}>=</option>
        <option value={EConstraintType.MORE}>≥</option>
      </select>
    );
  }
);

export default ConstraintSelect;
