import type { FC, ReactNode } from "react";

type FABType = {
  variant: "basic" | "extended";
  children?: ReactNode;
  icon: ReactNode;
};

const FAB: FC<FABType> = ({ variant, children, icon }) => {
  if (variant === "extended") {
    return (
      <button className="fabs relative flex flex-row items-center justify-center h-14 gap-x-3 p-4 pr-8 rounded-2xl overflow-hidden shadow-lg text-sm tracking-[.00714em] font-medium bg-primary">
        <span>{icon}</span>
        {children}
      </button>
    );
  } else {
    return (
      <button className="fabs relative flex flex-row items-center justify-center w-14 h-14 gap-x-2 p-2 rounded-2xl overflow-hidden shadow-lg text-sm tracking-[.00714em] font-medium bg-primary">
        <span>{icon}</span>
      </button>
    );
  }
};

export default FAB;
