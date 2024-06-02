import { EVariableType } from "@/constants";
import { Term } from "@/core";
import { Table } from "@/hooks/useSimplex";
import { getRandomKey } from "@/utils";
import React from "react";
import { Td } from "..";

export interface SimplexTableProps {
  numberOfTable: number;
  standardizedObjectiveFunction: Term[];
  table: Table;
}

const SimplexTable: React.FC<SimplexTableProps> = ({
  numberOfTable,
  standardizedObjectiveFunction,
  table,
}) => {
  const firstRow = (
    <>
      <Td isIdentifier border="r">
        <p className="min-w-max">{`Tabla ${numberOfTable}`}</p>
      </Td>
      <Td semibold border="r">
        <p>
          C<sub>j</sub>
        </p>
      </Td>
      {standardizedObjectiveFunction.map((term) => {
        return (
          <Td border="r" key={[getRandomKey(), getRandomKey()].join("-")}>
            <p>
              {term.type === EVariableType.ARTIFICIAL
                ? `${
                    term.coefficient === -1 || term.coefficient === 1
                      ? term.coefficient < 0
                        ? "-"
                        : ""
                      : term.coefficient
                  }M`
                : term.coefficient}
            </p>
          </Td>
        );
      })}
    </>
  );

  const secondRow = (
    <>
      <Td semibold border="r">
        <p>
          C<sub>b</sub>
        </p>
      </Td>
      <Td semibold border="r">
        <p>Base</p>
      </Td>
      {standardizedObjectiveFunction.map((term) => {
        return (
          <Td semibold border="r" key={[getRandomKey(), getRandomKey()].join("-")}>
            <p>
              {term.type}
              <sub>{term.subindex}</sub>
            </p>
          </Td>
        );
      })}
      <Td semibold>R</Td>
    </>
  );

  return (
    <table className="block w-max mx-auto border border-white border-opacity-30 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 overflow-hidden shadow-sm">
      <thead>
        <tr className="border-b border-white border-opacity-30">{firstRow}</tr>
        <tr>{secondRow}</tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default SimplexTable;
