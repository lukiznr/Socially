import type { FC, ReactNode } from "react";

type CardFunction = {
  children: ReactNode;
};

const Card: FC<CardFunction> = ({ children }) => {
  return (
    <div className="bg-surface-100 dark:bg-surface-900 border-2 border-surface-300 dark:border-surface-700 rounded-lg p-2 max-w-lg mx-auto my-2">
      {children}
    </div>
  );
};

export function TestCard() {
  return (
    <>
      <Card>
        Card
        <hr className="-mx-2 my-2 text-highlightMed" />
        Memem
      </Card>
    </>
  );
}
export default Card;
