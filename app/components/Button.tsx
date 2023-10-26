import React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "tertiary";
  outline?: boolean;
  classNames?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  outline,
  classNames,
  ...buttonProps
}) => {
  let baseClasses = "py-2 px-4 rounded focus:outline-none";
  let buttonClasses = outline ? ` border border-${variant}` : ` bg-${variant}`;

  return (
    <button
      className={`${baseClasses} ${buttonClasses} ${classNames}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

// ButtonGroup component
type ButtonGroupProps = {
  children: React.ReactNode;
  justify?: "start" | "center" | "end";
  className?: string;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  justify,
  className,
}) => {
  let justifyClass = `justify-${justify || "start"}`;

  return <div className={`flex ${justifyClass} ${className}`}>{children}</div>;
};

export { Button, ButtonGroup };
