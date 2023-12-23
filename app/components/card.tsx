import type { FC, ReactNode } from "react";

type CardFunction = {
  children: ReactNode;
};

const Card: FC<CardFunction> = ({ children }) => {
  return (
    <div className="bg-surface border border-highlightMed rounded p-2 max-w-md mx-auto">
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
