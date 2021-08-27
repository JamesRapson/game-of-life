import { PropsWithChildren } from "react";

type ButtonProps = {
  label?: string;
  disabled?: boolean;
  onClick: () => any;
};
export const Button = ({
  label,
  disabled = false,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      disabled={disabled}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border border-blue-700 rounded ml-2 flex m-1 ${
        disabled ? "opacity-40" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex">{children}</div>
      {label && <div className="flex leading-8">{label}</div>}
    </button>
  );
};
