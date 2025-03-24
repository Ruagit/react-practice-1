import { render, screen } from "@testing-library/react";
import { FavouriteButton } from "./";

describe("FavouriteButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with heart emoji when not favourited", () => {
    render(<FavouriteButton favourited={false} onClick={jest.fn()} />);

    expect(screen.getByText("❤️")).toBeInTheDocument();
  });

  it("renders with check emoji when favourited", () => {
    render(<FavouriteButton favourited={true} onClick={jest.fn()} />);

    expect(screen.getByText("✅")).toBeInTheDocument();
  });

  it("includes default button type", () => {
    render(
      <FavouriteButton
        favourited={false}
        onClick={jest.fn()}
        className="custom-class"
      />
    );

    expect(screen.getByText("❤️")).toHaveAttribute("type", "button");
  });

  it("includes additional className when provided", () => {
    render(
      <FavouriteButton
        favourited={false}
        onClick={jest.fn()}
        className="custom-class"
      />
    );

    expect(screen.getByText("❤️")).toHaveAttribute(
      "class",
      "button favourite-button custom-class"
    );
  });
});
