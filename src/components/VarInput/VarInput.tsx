import React from "react";

export interface VarInputProps {
  addition?: "left" | "right";
  subindex: number;
}

const AdditionSymbol = () => {
  return <p className="mx-1 font-semibold text-gray-300">+</p>;
};

const VarInput: React.FC<VarInputProps> = ({ addition, subindex }) => {
  return (
    <div className="flex items-center">
      {addition === "left" && <AdditionSymbol />}
      <input
        className="block w-10 rounded-l-lg p-2 font-semibold text-gray-200 bg-white bg-opacity-25"
        type="number"
      />
      <div className="flex items-center h-full rounded-r-lg bg-white bg-opacity-80">
        <p className="px-2 font-medium text-primary">
          X<sub>{subindex}</sub>
        </p>
      </div>
      {addition === "right" && <AdditionSymbol />}
    </div>
  );
};

export default VarInput;
