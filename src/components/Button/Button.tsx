import React, { ButtonHTMLAttributes } from "react";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, ...otherProps } = props;

  return (
    <button
      className={`py-1 px-4 rounded-full font-semibold bg-white bg-opacity-75 transition-colors duration-200 hover:bg-opacity-100 ${
        className ?? ""
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
