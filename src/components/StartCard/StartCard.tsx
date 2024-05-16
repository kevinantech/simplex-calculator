"use client";
import React from "react";

export interface StartCardProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StartCard: React.FC<StartCardProps> = ({ onChange }) => {
  return (
    <div
      id="start"
      className="flex flex-col items-center w-80 py-8 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow"
    >
      <p className="text-center font-semibold text-gray-300 ">
        Número de variables
      </p>
      <input
        className="block mt-5 w-16 rounded py-2 px-3 font-semibold text-gray-200 bg-white bg-opacity-25"
        type="number"
        onChange={onChange}
      />
      <button className="mt-5 py-1 px-4 rounded-md font-semibold bg-white bg-opacity-50 transition-colors duration-200 hover:bg-opacity-75">
        Empezar
      </button>
    </div>
  );
};

export default StartCard;
