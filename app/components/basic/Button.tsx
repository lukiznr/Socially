import React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode; // Tambahkan tanda tanya (?) untuk menandakan opsional
  variant?: "primary" | "secondary" | "tertiary"; // Tambahkan tanda tanya (?) untuk menandakan opsional
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

Button.defaultProps = { children: <p>Button</p>, variant: "primary" };

// ButtonGroup component
type ButtonGroupProps = {
  children: React.ReactNode;
  justify?: "start" | "center" | "end";
  column?: boolean;
  className?: string;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children = <Button></Button>,
  justify,
  column,
  className,
}) => {
  let justifyClass = `justify-${justify || "start"}`;
  let columnClass = column ? "flex-col" : "";
  return (
    <div className={`flex ${columnClass} gap-1 ${justifyClass} ${className}`}>
      {children}
    </div>
  );
};

export { Button, ButtonGroup };
