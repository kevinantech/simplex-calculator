import { ModelForm, StartCard } from "@/components";
import { AppContext, ContextValue } from "@/contexts/app.context";
import { useNumberOfConstraints, useNumberOfVariables } from "@/hooks";
import { useMemo } from "react";

export default function App() {
  const { numberOfVariables, setNumberOfVariablesCallback } = useNumberOfVariables();
  const { numberOfConstraints, setNumberOfConstraintsCallback } =
    useNumberOfConstraints();

  const value: ContextValue = useMemo(
    () => ({
      numberOfVariables: {
        value: numberOfVariables,
        dispatch: setNumberOfVariablesCallback,
      },
      numberOfConstraints: {
        value: numberOfConstraints,
        dispatch: setNumberOfConstraintsCallback,
      },
    }),
    [
      numberOfConstraints,
      numberOfVariables,
      setNumberOfConstraintsCallback,
      setNumberOfVariablesCallback,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      <main className="flex flex-col items-center mb-16 pt-10">
        {value.numberOfVariables.value === 0 ? <StartCard /> : <ModelForm />}
      </main>
    </AppContext.Provider>
  );
}
