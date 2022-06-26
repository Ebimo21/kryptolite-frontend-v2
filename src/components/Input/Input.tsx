import React from "react";
import { InputProps, scales } from "./types";
import cls from "classnames";

const getHeight = ({ scale = scales.MD }: InputProps) => {
  switch (scale) {
    case scales.SM:
      return "32px";
    case scales.LG:
      return "48px";
    case scales.MD:
    default:
      return "40px";
  }
};

const Input: React.FC<InputProps> = ({ scale, className, ...rest }) => {
  return (
    <input
      className={cls(
        `first-letter:rounded-2xl block text-base outline-none py-0 px-4 w-full border border-gray-400
        disabled:cursor-not-allowed shadow-md disabled:shadow-none`,
        className,
      )}
      style={{ height: getHeight({ scale }) }}
      {...rest}
    />
  );
};

export default Input;
