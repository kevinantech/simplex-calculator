import { AppContext } from "@/contexts/app.context";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Title } from "..";

export interface StartCardProps {}

type FormType = {
  numberOfVars: number;
  numberOfConstraints: number;
};

const StartCard: React.FC<StartCardProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const context = useContext(AppContext);

  return (
    <form
      className="flex flex-col items-center w-80 py-8 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow"
      onSubmit={handleSubmit((data) => {
        context.numberOfVariables.dispatch(data.numberOfVars);
        context.numberOfConstraints.dispatch(data.numberOfConstraints);
      })}
    >
      <Title className="mb-4">Número de variables</Title>
      <input
        className="block w-16 rounded py-2 px-3 font-semibold text-gray-200 bg-white bg-opacity-25"
        type="number"
        {...register("numberOfVars", {
          min: { value: 1, message: "Debe haber al menos una variable." },
          max: { value: 10, message: "El límite de variables es 10." },
          required: "Ingrese el número de variables.",
        })}
      />
      {!!errors.numberOfVars?.message && (
        <p className="mt-3 rounded-lg text-sm text-red-500">
          {errors.numberOfVars.message}
        </p>
      )}
      <Title className="mt-6 mb-4">Número de Restricciones</Title>
      <input
        className="block w-16 rounded py-2 px-3 font-semibold text-gray-200 bg-white bg-opacity-25"
        type="number"
        {...register("numberOfConstraints", {
          min: { value: 1, message: "Debe haber al menos una restricción." },
          required: "Ingrese el número de restricciones.",
        })}
      />
      {!!errors.numberOfConstraints?.message && (
        <p className="mt-3 rounded-lg text-sm text-red-500">
          {errors.numberOfConstraints.message}
        </p>
      )}
      <Button className="mt-8" type="submit">
        Iniciar
      </Button>
    </form>
  );
};

export default StartCard;
