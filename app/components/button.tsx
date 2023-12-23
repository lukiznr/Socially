import clsx from "clsx";
import type { FC, ReactNode, ButtonHTMLAttributes } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
}

const Button: FC<ButtonProps> = ({ children,...props }) => {
  const baseClass: string =
    "group py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border bg-blue-500 text-white";

  return (
    <button {...props} className={clsx(baseClass)}>
      {children}
    </button>
  );
};

export const TestButton = () => {
  return (
    <div className="flex gap-2 justify-center m-2 p-2">
      <h2>Variant Tombol</h2>
      <Button>Solid</Button>
    </div>
  );
};

export default Button;
