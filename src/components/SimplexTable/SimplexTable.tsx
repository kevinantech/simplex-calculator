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
  className?: string;
  children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return <td className="min-w-max py-2 px-3 border-y text-center ">{children}</td>;
};

const SimplexTable: React.FC<SimplexTableProps> = ({
  numberOfTable,
  standardizedObjectiveFunction,
  table,
}) => {
  const header = (
    <>
      <TableCell>
        <p className="min-w-max">{`Table ${numberOfTable}`}</p>
      </TableCell>
      <TableCell>
        <p>
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
    <table className="block w-max mx-auto">
      <thead>
        <tr>{header}</tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default SimplexTable;
