import { ModelForm, SimplexTable, StartCard } from "@/components";
import { AppContext, ContextValue } from "@/contexts/app.context";
import { useNumberOfConstraints, useNumberOfVariables, useSimplex } from "@/hooks";
import { useMemo } from "react";

export default function App() {
  const { numberOfVariables, setNumberOfVariablesCallback } = useNumberOfVariables();
  const { numberOfConstraints, setNumberOfConstraintsCallback } =
    useNumberOfConstraints();
  const { handleCalculation, simplex } = useSimplex();
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
      handleCalculation,
    }),
    [
      handleCalculation,
      numberOfConstraints,
      numberOfVariables,
      setNumberOfConstraintsCallback,
      setNumberOfVariablesCallback,
    ]
  );
  const isBeginning = numberOfVariables === 0 || numberOfConstraints === 0;

  const tables = simplex && (
    <div>
      {simplex.tables.map((table) => {
        const key = [
          Math.random().toString(16).substring(2, 9),
          Math.random().toString(16).substring(2, 9),
        ].join("-");
        return <SimplexTable table={table} key={key} />;
      })}
    </div>
  );

  return (
    <AppContext.Provider value={value}>
      <main className="flex flex-col items-center mb-16 pt-10">
        {simplex ? <>Simplex</> : isBeginning ? <StartCard /> : <ModelForm />}
      </main>
      <footer className="flex flex-col items-center mb-6">
        <p className="mb-2 px-10 text-center text-xs text-gray-300">
          Kevin Gomez, Boris Bello, Diogo Rodriguez, Juan Narvaez & Juan Paternina.
        </p>
        <p className="text-xs text-gray-300"> © 2024</p>
      </footer>
    </AppContext.Provider>
  );
}
