import { Term } from "@/core";
import { Table } from "@/hooks/useSimplex";
import { getRandomKey } from "@/utils";
import React from "react";

export interface SimplexTableProps {
  numberOfTable: number;
  standardizedObjectiveFunction: Term[];
  table: Table;
}

interface TableCellProps {
  children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return (
    <td className="min-w-max py-2 px-3 text-center text-base text-white">{children}</td>
  );
};

const SimplexTable: React.FC<SimplexTableProps> = ({
  numberOfTable,
  standardizedObjectiveFunction,
  table,
}) => {
  const header = (
    <>
      <TableCell>
        <p className="min-w-max">{`Tabla ${numberOfTable}`}</p>
      </TableCell>
      <TableCell>
        <p className="font-semibold">
          C<sub>j</sub>
        </p>
      </TableCell>
      {standardizedObjectiveFunction.map((term) => {
        return (
          <TableCell key={[getRandomKey(), getRandomKey()].join("-")}>
            <p>
              {term.type}
              <sub>{term.subindex}</sub>
            </p>
          </TableCell>
        );
      })}
      <TableCell>R</TableCell>
    </>
  );

  return (
    <table className="block w-max mx-auto px-2 border rounded-2xl bg-slate-600 shadow-sm">
      <thead>
        <tr className="rounded-t-2xl">{header}</tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default SimplexTable;
