import { ObjectiveForm, ObjectiveFunctionForm } from "@/components";
import { EVariableType } from "@/constants";
import { AppContext } from "@/contexts/app.context";
import { OFTerm } from "@/core/of-terms";
import React, { useContext, useMemo } from "react";

export interface ModelFormProps {}

/* OFTerms = Objective Function Terms */
const genOFTerms = (length: number): OFTerm[] => {
  const terms: OFTerm[] = [];
  for (let i = 1; i <= length; i++) {
    const term = new OFTerm(EVariableType.NON_BASIC, i);
    terms.push(term);
  }
  return terms;
};

const ModelForm: React.FC<ModelFormProps> = () => {
  const { numberOfVariables } = useContext(AppContext);
  const ofTerms = useMemo<OFTerm[]>(() => genOFTerms(numberOfVariables.value), []);

  return (
    <div className="flex flex-col items-center gap-8 py-8 px-10 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow">
      <ObjectiveForm />
      <ObjectiveFunctionForm terms={ofTerms} />
    </div>
  );
};

export default ModelForm;
