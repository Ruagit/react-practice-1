import { render, screen } from "@testing-library/react";
import { Nav } from ".";
import { paths } from "../../constants";
import { useLocation } from "wouter";

jest.mock("wouter", () => ({
  ...jest.requireActual("wouter"),
  useLocation: jest.fn(),
}));

describe("Nav component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders navigation with two links", () => {
    (useLocation as jest.Mock).mockReturnValue(["/some-path"]);
    render(<Nav />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Favourites")).toBeInTheDocument();
  });

  it("sets active state correctly when on search path", () => {
    (useLocation as jest.Mock).mockReturnValue([paths.search]);
    render(<Nav />);

    expect(screen.getByText("Search")).toHaveAttribute("class", "link active");
    expect(screen.getByText("Favourites")).toHaveAttribute("class", "link");
  });

  it("passes the correct href values to links", () => {
    (useLocation as jest.Mock).mockReturnValue(["/some-path"]);
    render(<Nav />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", paths.search);
    expect(links[1]).toHaveAttribute("href", paths.favourites);
  });
});
