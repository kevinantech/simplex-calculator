import { AppContext } from "@/contexts/app.context";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Title } from "..";

export interface StartCardProps {}

type FormType = {
  numberOfVars: number;
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
      onSubmit={handleSubmit(({ numberOfVars: number }) =>
        context.numberOfVariables.dispatch(number)
      )}
    >
      <Title>Número de variables</Title>
      <input
        className="block my-5 w-16 rounded py-2 px-3 font-semibold text-gray-200 bg-white bg-opacity-25"
        type="number"
        {...register("numberOfVars", {
          min: { value: 1, message: "Debe haber al menos una variable." },
          max: { value: 10, message: "El límite de variables es 10." },
          required: "Ingrese el número de variables.",
        })}
      />
      <Button type="submit">Iniciar</Button>
      {!!errors.numberOfVars?.message && (
        <p className="mt-4 rounded-lg text-sm text-red-500">
          {errors.numberOfVars.message}
        </p>
      )}
    </form>
  );
};

export default StartCard;
