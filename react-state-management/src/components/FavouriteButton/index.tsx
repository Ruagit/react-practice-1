import { Button } from "../Button";
import type { ButtonProps } from "../Button";
import "./FavouriteButton.css";

export interface FavouriteProps {
  favourited: boolean;
}

interface FavouriteButtonProps
  extends FavouriteProps,
    Omit<ButtonProps, "children"> {}

export const FavouriteButton = ({
  type = "button",
  className,
  favourited,
  ...otherProps
}: FavouriteButtonProps) => {
  return (
    <Button className={`favourite-button ${className || ""}`} {...otherProps}>
      {favourited ? "✅" : "❤️"}
    </Button>
  );
};
