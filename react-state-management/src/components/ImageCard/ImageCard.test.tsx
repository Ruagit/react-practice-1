import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageCard } from "./";

describe("ImageCard component", () => {
  const defaultProps = {
    id: "test-id-123",
    title: "Test Image",
    imageUrl: "https://example.com/test.jpg",
    width: "200",
    height: "150",
    onClick: jest.fn(),
    favourited: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct image and attributes", () => {
    render(<ImageCard {...defaultProps} />);

    const image = screen.getByAltText(defaultProps.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", defaultProps.imageUrl);
    expect(image).toHaveAttribute("width", defaultProps.width);
    expect(image).toHaveAttribute("height", defaultProps.height);
    expect(image).toHaveClass("image-card__image");
  });

  it("applies the correct className to container elements", () => {
    render(<ImageCard {...defaultProps} />);

    const card = screen.getByRole("img").closest(".image-card");
    expect(card).toHaveClass("image-card");

    const container = screen.getByRole("img").closest(".image-card__container");
    expect(container).toHaveClass("image-card__container");
  });

  it("renders the FavouriteButton", () => {
    render(<ImageCard {...defaultProps} />);

    expect(screen.getByText("❤️")).toBeVisible();
  });

  it("calls onClick with the correct id when the favourite button is clicked", async () => {
    render(<ImageCard {...defaultProps} />);

    await userEvent.click(screen.getByText("❤️"));

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenCalledWith(defaultProps.id);
  });
});
