import { render, screen } from "@testing-library/react";
import { GenericButton } from ".";

describe("GenericButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("includes additional className when provided", () => {
    render(
      <GenericButton className="custom-class" onClick={jest.fn()}>
        My button text
      </GenericButton>
    );

    expect(screen.getByText("My button text")).toHaveAttribute(
      "class",
      "button generic-button custom-class"
    );
  });
});
