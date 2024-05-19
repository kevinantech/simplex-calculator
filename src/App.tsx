import { ModelForm, StartCard } from "@/components";
import { AppContext, ContextValue } from "@/contexts/app.context";
import { useNumberOfVariables } from "@/hooks";
import { useMemo } from "react";

export default function App() {
  const { numberOfVariables, setNumberOfVariablesCallback } = useNumberOfVariables();

  const value: ContextValue = useMemo(
    () => ({
      numberOfVariables: {
        value: numberOfVariables,
        dispatch: setNumberOfVariablesCallback,
      },
    }),
    [numberOfVariables, setNumberOfVariablesCallback]
  );

  return (
    <AppContext.Provider value={value}>
      <main className="flex flex-col items-center mb-16 pt-10">
        {value.numberOfVariables.value === 0 ? <StartCard /> : <ModelForm />}
      </main>
    </AppContext.Provider>
  );
}
