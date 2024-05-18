import React from "react";

export interface TitleProps {
  children: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <p className={`font-semibold text-gray-300 ${className ?? ""}`}>
      {children}
    </p>
  );
};

export default Title;
