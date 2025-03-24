import { Button } from "../Button";
import type { ButtonProps } from "../Button";
import "./GenericButton.css";

interface GenericButtonProps extends ButtonProps {}

export const GenericButton = ({
  className,
  children,
  ...otherProps
}: GenericButtonProps) => {
  return (
    <Button {...otherProps} className={`generic-button ${className || ""}`}>
      {children}
    </Button>
  );
};
