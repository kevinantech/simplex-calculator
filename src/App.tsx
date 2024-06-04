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

  const tables =
    simplex &&
    simplex.tables.map((table, index) => {
      return (
        <SimplexTable
          key={table.id}
          n={index + 1}
          standardizedObjectiveFunction={simplex.objectiveFunction}
          table={table}
        />
      );
    });

  return (
    <AppContext.Provider value={value}>
      <main className="mb-16 pt-10">
        {simplex ? tables : isBeginning ? <StartCard /> : <ModelForm />}
      </main>
      <footer className="mb-6">
        <p className="mb-2 px-16 text-xs text-center text-gray-300">
          Kevin Gomez, Boris Bello, Diogo Rodriguez, Juan Narvaez & Juan Paternina.
        </p>
        <p className="w-max mx-auto text-xs text-gray-300"> © 2024</p>
      </footer>
    </AppContext.Provider>
  );
}
