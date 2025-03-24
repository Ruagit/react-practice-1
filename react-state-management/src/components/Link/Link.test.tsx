import { render, screen } from "@testing-library/react";
import { Link } from ".";

describe("Link Component", () => {
  it("renders with correct text", () => {
    render(<Link href="/home">Home</Link>);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("has the correct base class", () => {
    render(<Link href="/about">About</Link>);

    const anchor = screen.getByText("About");
    expect(anchor).toHaveClass("link");
    expect(anchor).not.toHaveClass("active");
  });

  it("has the active class when active prop is true", () => {
    render(
      <Link href="/contact" active={true}>
        Contact
      </Link>
    );

    const anchor = screen.getByText("Contact");
    expect(anchor).toHaveClass("link");
    expect(anchor).toHaveClass("active");
  });

  it("has the correct href", () => {
    render(<Link href="/products">Products</Link>);

    expect(screen.getByText("Products")).toHaveAttribute("href", "/products");
  });
});
