import { render, screen } from "@testing-library/react";
import { SearchResults } from "./";

describe("SearchResults", () => {
  const mockImages = [
    {
      id: "1",
      imageUrl: "https://example.com/image1.jpg",
      title: "Image 1",
      width: "800",
      height: "600",
    },
    {
      id: "2",
      imageUrl: "https://example.com/image2.jpg",
      title: "Image 2",
      width: "1024",
      height: "768",
    },
    {
      id: "3",
      imageUrl: "https://example.com/image3.jpg",
      title: "Image 3",
      width: "1280",
      height: "720",
    },
  ];

  it("renders correctly with images", () => {
    render(<SearchResults images={mockImages} />);

    expect(screen.getAllByRole("img").length).toEqual(3);
  });

  it("renders nothing when images array is empty", () => {
    const { container } = render(<SearchResults images={[]} />);

    expect(container.firstChild).toHaveTextContent("");
  });

  it("renders image card correctly", () => {
    render(<SearchResults images={mockImages} />);

    const firstImageCard = screen.getAllByRole("img")[0];
    expect(firstImageCard).toHaveAttribute(
      "src",
      "https://example.com/image1.jpg"
    );
    expect(firstImageCard).toHaveAttribute("alt", mockImages[0].title);
    expect(firstImageCard).toHaveAttribute("width", mockImages[0].width);
    expect(firstImageCard).toHaveAttribute("height", mockImages[0].height);
  });
});
