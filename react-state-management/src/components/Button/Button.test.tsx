import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, ButtonProps } from "./";

describe("Button Component", () => {
  const defaultProps: ButtonProps = {
    onClick: jest.fn(),
    children: "Click Me",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<Button {...defaultProps} />);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("button");
  });

  it("renders with custom type", () => {
    render(<Button {...defaultProps} type="submit" />);

    expect(screen.getByRole("button", { name: "Click Me" })).toHaveAttribute(
      "type",
      "submit"
    );
  });

  it("renders in disabled state", () => {
    render(<Button {...defaultProps} disabled />);

    expect(screen.getByRole("button", { name: "Click Me" })).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<Button {...defaultProps} className="custom-class" />);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toHaveClass("button");
    expect(button).toHaveClass("custom-class");
  });

  it("renders children correctly", () => {
    render(
      <Button {...defaultProps}>
        <span>Custom Content</span>
      </Button>
    );

    expect(screen.getByText("Custom Content")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    render(<Button {...defaultProps} />);

    await userEvent.click(screen.getByRole("button", { name: "Click Me" }));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    render(<Button {...defaultProps} disabled />);

    await userEvent.click(screen.getByRole("button", { name: "Click Me" }));
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
});
