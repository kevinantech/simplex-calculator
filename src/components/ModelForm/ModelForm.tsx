import {
  Button,
  ConstraintField,
  ObjectiveField,
  ObjectiveFunctionField,
} from "@/components";
import { EObjectiveType, EVariableType } from "@/constants";
import { AppContext } from "@/contexts/app.context";
import { OFTerm } from "@/core/of-terms";
import React, { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export type ModelFormType = {
  objective: EObjectiveType;
} & { [key: string]: number };

/* OFTerms = Objective Function Terms */
const genateOFTerms = (length: number): OFTerm[] => {
  const terms: OFTerm[] = [];
  for (let i = 1; i <= length; i++) {
    const term = new OFTerm(EVariableType.NON_BASIC, i);
    terms.push(term);
  }
  return terms;
};

export interface ModelFormProps {}

const ModelForm: React.FC<ModelFormProps> = () => {
  const { numberOfVariables } = useContext(AppContext);
  const ofTerms = useMemo<OFTerm[]>(() => genateOFTerms(numberOfVariables.value), []);
  const { register, handleSubmit } = useForm<ModelFormType>();
  const [numberOfConstraints, setNumberOfConstraints] = useState<number[]>([1]);

  /* Incrementa de la siguiente manera: [1] => [1, 2] => [1,2,3] */
  const incrementNumberOfConstraints = () =>
    setNumberOfConstraints((prevState) => [
      ...prevState,
      prevState[prevState.length - 1] + 1,
    ]);

  return (
    <form
      className="flex flex-col mx-8 items-center py-8 px-10 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow-lg"
      onSubmit={handleSubmit(
        (data) => console.log("data: ", { data, numberOfConstraints }),
        () => {}
      )}
    >
      <ObjectiveField {...register("objective", { required: true })} />
      <ObjectiveFunctionField register={register} terms={ofTerms} />
      {numberOfConstraints.map((numberOfConstraint) => (
        <ConstraintField
          key={`ConstraintField-${numberOfConstraint}`}
          register={register}
          terms={ofTerms}
          numberOfContraint={numberOfConstraint}
        />
      ))}
      <div className="flex flex-col gap-3 semi-sm:flex-row mt-12">
        <Button onClick={incrementNumberOfConstraints} type="button">
          Añadir restricción
        </Button>
        <Button className="self-center" type="submit">
          Calcular
        </Button>
      </div>
    </form>
  );
};

export default ModelForm;
