import { EVariableType } from "@/constants";
import { Term } from "@/core";
import { Table } from "@/hooks/useSimplex";
import { getArtificialCoefficientM } from "@/utils/getArtificialCoefficient";
import React from "react";
import { Td } from "..";

export interface SimplexTableProps {
  n: number;
  standardizedObjectiveFunction: Term[];
  table: Table;
}

const SimplexTable: React.FC<SimplexTableProps> = ({
  n,
  standardizedObjectiveFunction,
  table,
}) => {
  const { basicVariables, standardizedConstraints, zj, cjzj } = table;

  const CjRow = (
    <>
      <Td isIdentifier border="r">
        Tabla {n}
      </Td>
      <Td decoration border="r">
        C<sub>j</sub>
      </Td>
      {standardizedObjectiveFunction.map((term) => {
        const key = [table.id, "CjRow", term.key].join("-");
        return (
          <Td border="r" key={key}>
            <p>
              {term.type === EVariableType.ARTIFICIAL
                ? getArtificialCoefficientM(term.coefficient)
                : term.coefficient}
            </p>
          </Td>
        );
      })}
    </>
  );

  const varsRow = (
    <>
      <Td decoration border="r">
        C<sub>b</sub>
      </Td>
      <Td decoration border="r">
        Base
      </Td>
      {standardizedObjectiveFunction.map((term) => {
        const key = [table.id, "varsRow", term.key].join("-");
        return (
          <Td decoration border="r" key={key}>
            {term.type}
            <sub>{term.subindex}</sub>
          </Td>
        );
      })}
      <Td decoration>R</Td>
    </>
  );

  const constraintsRows = standardizedConstraints.map((standardizedConstraint, index) => {
    const { coefficient, subindex, type } = basicVariables[index];
    const key = [table.id, "constraintsRow", index].join("-");
    return (
      <tr className="border-b border-white border-opacity-30" key={key}>
        <Td border="r">
          {type === EVariableType.ARTIFICIAL
            ? getArtificialCoefficientM(coefficient)
            : coefficient}
        </Td>
        <Td decoration border="r">
          {type}
          <sub>{subindex}</sub>
        </Td>
        {standardizedConstraint.map((term, index) => {
          const isLastIndex = index + 1 === standardizedConstraint.length;
          const childrenKey = [key, term.key].join("-");
          return (
            <Td border={isLastIndex ? undefined : "r"} key={childrenKey}>
              {term.coefficient}
            </Td>
          );
        })}
      </tr>
    );
  });

  const ZjRow = (
    <>
      <Td border="r" empty />
      <Td decoration border="r">
        Z<sub>j</sub>
      </Td>
      {zj.map(({ value, artificialValue }, index) => {
        const isLastIndex = index + 1 === zj.length;
        const m = getArtificialCoefficientM(artificialValue);
        const key = [table.id, "ZjRow", index].join("-");
        return (
          <Td border={isLastIndex ? undefined : "r"} key={key}>
            {value && m
              ? artificialValue > 0
                ? value + "+" + m
                : value + m
              : value
              ? value
              : m
              ? m
              : 0}
          </Td>
        );
      })}
    </>
  );

  const CjZjRow = (
    <>
      <Td border="r" empty />
      <Td border="r" decoration>
        C<sub>j</sub> - Z<sub>j</sub>
      </Td>
      {cjzj.map(({ value, artificialValue }, index) => {
        const m = getArtificialCoefficientM(artificialValue);
        const key = [table.id, "CjZjRow", index].join("-");
        return (
          <Td border="r" key={key}>
            {value && m
              ? artificialValue > 0
                ? value + "+" + m
                : value + m
              : value
              ? value
              : m
              ? m
              : 0}
          </Td>
        );
      })}
      <Td empty />
    </>
  );

  return (
    <div className="w-[calc(100vh - 2rem)] mx-8 overflow-x-auto">
      <table className="block w-max mx-auto border border-white border-opacity-30 rounded-2xl backdrop-blur-[8px] bg-white bg-opacity-15 overflow-hidden shadow-sm">
        <tbody>
          <tr className="border-b border-white border-opacity-30">{CjRow}</tr>
          <tr className="border-b border-white border-opacity-30">{varsRow}</tr>
          {constraintsRows}
          <tr className="border-b border-white border-opacity-30">{ZjRow}</tr>
          <tr>{CjZjRow}</tr>
        </tbody>
      </table>
    </div>
  );
};

export default SimplexTable;
