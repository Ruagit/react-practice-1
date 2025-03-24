import "./Button.css";

export interface ButtonProps {
  type?: "submit" | "button";
  disabled?: boolean;
  onClick(): void;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  type = "button",
  disabled = false,
  onClick,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`button ${className || ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
