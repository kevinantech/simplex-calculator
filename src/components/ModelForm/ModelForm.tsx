import { ObjectiveForm, ObjectiveFunctionForm } from "@/components";
import React, { memo } from "react";

export interface ModelFormProps {}

/* const ObjectiveFunctionForm = () => {
  const { varsQuantity } = useContext(AppContext);

  const inputs = useMemo<JSX.Element[]>(() => {
    const array: JSX.Element[] = [];
    for (let i = 0; i < varsQuantity.value; i++)
      array.push(<VarInput key={generateKey()} />);
    return array;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="flex"></div>;
}; */

const ModelForm: React.FC<ModelFormProps> = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-8 px-10 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 shadow">
      <ObjectiveForm />
      <ObjectiveFunctionForm />
    </div>
  );
};

export default memo(ModelForm);
