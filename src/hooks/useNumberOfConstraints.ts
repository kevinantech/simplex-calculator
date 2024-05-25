import { useCallback, useState } from "react";

const useNumberOfConstraints = () => {
  const [numberOfConstraints, setNumberOfConstraints] = useState<number>(0);
  const setNumberOfConstraintsCallback = useCallback(
    (n: number) => setNumberOfConstraints(n),
    []
  );

  return { numberOfConstraints, setNumberOfConstraintsCallback };
};

export default useNumberOfConstraints;
