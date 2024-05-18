import { useCallback, useState } from "react";

const useNumberOfVariables = () => {
  const [numberOfVariables, setNumberOfVariables] = useState<number>(0);
  const setNumberOfVariablesCallback = useCallback(
    (n: number) => setNumberOfVariables(n),
    []
  );

  return {
    numberOfVariables,
    setNumberOfVariablesCallback,
  };
};

export default useNumberOfVariables;
