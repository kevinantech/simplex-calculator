import { Table } from "@/hooks/useSimplex";
import React from "react";

export interface SimplexTableProps {
  table: Table;
}

const SimplexTable: React.FC<SimplexTableProps> = ({ table }) => {
  return <div>SimplexTable works!</div>;
};

export default SimplexTable;
