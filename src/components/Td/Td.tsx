import React from "react";

type Rounded = "tl" | "tr" | "bl" | "br";
type BorderSide = "l" | "t" | "r" | "b";

export interface TdProps {
  children: React.ReactNode;
  border?: BorderSide;
  isIdentifier?: boolean;
  rounded?: Rounded;
  semibold?: boolean;
}

const Td: React.FC<TdProps> = ({ children, border, isIdentifier, rounded, semibold }) => {
  return (
    <td
      className={`min-w-max py-2 px-3 text-center text-base text-white border-white border-opacity-30 ${
        isIdentifier ? "bg-white bg-opacity-30" : ""
      } ${semibold ? "font-semibold" : ""} ${border === "l" ? "border-l" : ""} ${
        border === "t" ? "border-t" : ""
      } ${border === "r" ? "border-r" : ""} ${border === "b" ? "border-b" : ""} 
				${rounded === "tl" ? "rounded-tl-2xl" : ""} ${rounded === "tr" ? "rounded-tr-2xl" : ""}
				${rounded === "br" ? "rounded-br-2xl" : ""} ${rounded === "bl" ? "rounded-bl-2xl" : ""}
			`}
    >
      {children}
    </td>
  );
};

export default Td;
