import type { FC, ReactNode } from "react";

type CardFunction = {
  bg?: string;
  children: ReactNode;
};

const Card: FC<CardFunction> = ({ bg, children }) => {
  return (
    <div
      className={`flex h-36 w-full items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 md:w-32 ${
        bg ? bg : "bg-surface-variant"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
