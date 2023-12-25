import clsx from "clsx";
import type { FC, ReactNode, ButtonHTMLAttributes } from "react";
import Spinner from "./spinner";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, loading, ...props }) => {
  const baseClass: string =
    "group py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border bg-blue-500 text-white";

  return (
    <button {...props} className={clsx(baseClass)}>
      {loading ? <Spinner color="whiteOnly"/> : children}
    </button>
  );
};

export const TestButton = () => {
  return (
    <div className="flex gap-2 justify-center m-2 p-2">
      <h2>Variant Tombol</h2>
      <Button>Solid</Button>
      <Button loading>Loading</Button>
    </div>
  );
};

export default Button;
