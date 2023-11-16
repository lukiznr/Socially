import type { FC, ReactNode } from "react";

type CardFunction = {
  bg?: string;
  children: ReactNode;
};

const Card: FC<CardFunction> = ({ bg, children }) => {
  return (
    <div
      className={`w-full md:w-32 h-36 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${
        bg ? bg : "bg-surface-variant"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
