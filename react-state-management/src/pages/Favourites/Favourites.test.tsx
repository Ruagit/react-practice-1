import { render, screen } from "@testing-library/react";
import { FavouritesPage } from "../Favourites";

describe.skip("Favourites Page Component", () => {
  it("should render the previously favourited items", () => {
    render(<FavouritesPage />);

    expect(screen.getAllByRole("img").length).toEqual(3);
  });
});
