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
  const { basicVariables, standardizedConstraints, zj, cjzj } = table;

  const firstRow = (
    <>
      <Td isIdentifier border="r">
        <p className="min-w-max">{`Tabla ${numberOfTable}`}</p>
      </Td>
      <Td decoration border="r">
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
      <Td decoration border="r">
        <p>
          C<sub>b</sub>
        </p>
      </Td>
      <Td decoration border="r">
        <p>Base</p>
      </Td>
      {standardizedObjectiveFunction.map((term) => {
        return (
          <Td decoration border="r" key={[getRandomKey(), getRandomKey()].join("-")}>
            <p>
              {term.type}
              <sub>{term.subindex}</sub>
            </p>
          </Td>
        );
      })}
      <Td decoration>R</Td>
    </>
  );

  const constraintsRows = standardizedConstraints.map((standardizedConstraint, index) => {
    const { coefficient, subindex, type } = basicVariables[index];
    return (
      <tr
        className="border-b border-white border-opacity-30"
        key={[getRandomKey(), getRandomKey].join("-")}
      >
        <Td border="r">
          {type === EVariableType.ARTIFICIAL
            ? coefficient === 1 || coefficient === -1
              ? coefficient < 0
                ? "-M"
                : "M"
              : `${coefficient}M`
            : coefficient}
        </Td>
        <Td decoration border="r">
          <p>
            {type} <sub>{subindex}</sub>
          </p>
        </Td>
        {standardizedConstraint.map((term, index) => {
          const isLastIndex = index + 1 === standardizedConstraint.length;
          return (
            <Td
              border={isLastIndex ? undefined : "r"}
              key={[getRandomKey(), getRandomKey].join("-")}
            >
              {term.coefficient}
            </Td>
          );
        })}
      </tr>
    );
  });

  const firstLastRow = (
    <>
      <Td border="r">{""}</Td>
      <Td decoration border="r">
        <p>
          C<sub>j</sub>
          {" - "}Z <sub>j</sub>
        </p>
      </Td>
      {cjzj.map(({ value, artificialValue }) => {
        const m =
          artificialValue !== 0
            ? artificialValue === 1 || artificialValue === -1
              ? artificialValue < 0
                ? "-M"
                : "M"
              : artificialValue + "M"
            : "";

        const c = value !== 0 ? value + "" : "";

        return (
          <Td border="r">
            {c && m && !m.includes("-") ? c + "+" + m : !c && !m ? 0 : c + m}
          </Td>
        );
      })}
      <Td>{""}</Td>
    </>
  );

  const secondLastRow = (
    <>
      <Td border="r">{""}</Td>
      <Td decoration border="r">
        <p>
          Z<sub>j</sub>
        </p>
      </Td>
      {zj.map(({ value, artificialValue }, index) => {
        const isLastIndex = index + 1 === zj.length;
        const m =
          artificialValue !== 0
            ? artificialValue === 1 || artificialValue === -1
              ? artificialValue < 0
                ? "-M"
                : "M"
              : artificialValue + "M"
            : "";

        const c = value !== 0 ? value + "" : "";

        return (
          <Td border={isLastIndex ? undefined : "r"}>
            {c && m && !m.includes("-") ? c + "+" + m : !c && !m ? 0 : c + m}
          </Td>
        );
      })}
    </>
  );

  return (
    <table className="block w-max mx-auto border border-white border-opacity-30 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 overflow-hidden shadow-sm">
      <tr className="border-b border-white border-opacity-30">{firstRow}</tr>
      <tr className="border-b border-white border-opacity-30">{secondRow}</tr>
      {constraintsRows}
      <tr className="border-b border-white border-opacity-30">{secondLastRow}</tr>
      <tr>{firstLastRow}</tr>
    </table>
  );
};

export default SimplexTable;
