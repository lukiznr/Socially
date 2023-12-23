import type { FC, ReactNode } from "react";

type FABType = {
  variant: "basic" | "extended";
  children?: ReactNode;
  icon: ReactNode;
};

const FAB: FC<FABType> = ({ variant, children, icon }) => {
  if (variant === "extended") {
    return (
      <button className="fabs bg-primary relative flex h-14 flex-row items-center justify-center gap-x-3 overflow-hidden rounded-2xl p-4 pr-8 text-sm font-medium tracking-[.00714em] shadow-lg">
        <span>{icon}</span>
        {children}
      </button>
    );
  } else {
    return (
      <button className="fabs bg-primary relative flex h-14 w-14 flex-row items-center justify-center gap-x-2 overflow-hidden rounded-2xl p-2 text-sm font-medium tracking-[.00714em] shadow-lg">
        <span>{icon}</span>
      </button>
    );
  }
};

export default FAB;
