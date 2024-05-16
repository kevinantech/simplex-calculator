import { useState } from "react";
import { StartCard } from "./components";

export default function App() {
  const [varsQuantity, setVarsQuantity] = useState<number>();
  return (
    <main className="flex flex-col items-center pt-10">
      <StartCard
        onChange={(e) => {
          if (e.target.value && !isNaN(Number(e.target.value)))
            setVarsQuantity(Number(e.target.value));
        }}
      />
    </main>
  );
}
