import clsx from "clsx";
import type { FC, ReactNode, ButtonHTMLAttributes } from "react";
import Spinner from "./spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  variant?: "solid"|"outline"
}

const Button: FC<ButtonProps> = ({ children, loading, ...props }) => {
  const baseClass: string =
    "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border bg-primary-500 text-white";
  return (
    <button {...props} className={clsx(props.className,baseClass)}>
      {loading ? <><Spinner color="whiteOnly" />Loading</> : children}
    </button>
  );
};

export const TestButton = () => {
  return (
    <div className="flex gap-2 justify-center m-2 p-2">
      <h2>Variant Tombol</h2>
      <Button>Solid</Button>
      <Button loading>Loading</Button>
      <Button className="bg-black">Testing</Button>
    </div>
  );
};

export default Button;
