import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchPage } from "../Search";
import { fetchMock, successfulResponse } from "../../utilities/fetchMock";

describe("Search Page Component", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  describe("when initiating search", () => {
    it("should render search results", async () => {
      fetchMock.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(successfulResponse),
        })
      );
      render(<SearchPage />);

      await act(async () => {
        await userEvent.type(
          screen.getByPlaceholderText("What you looking for?"),
          "tennis"
        );
        await userEvent.click(
          screen.getByRole("button", { name: "Find GIF!" })
        );
      });

      await waitFor(() => {
        expect(screen.getAllByRole("img").length).toEqual(3);
      });
    });
  });

  describe("when favouriting an image", () => {
    it("should update favourite button", async () => {
      fetchMock.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(successfulResponse),
        })
      );
      render(<SearchPage />);

      await act(async () => {
        await userEvent.type(
          screen.getByPlaceholderText("What you looking for?"),
          "golf"
        );
        await userEvent.click(
          screen.getByRole("button", { name: "Find GIF!" })
        );
      });

      await waitFor(() => {
        const unfavouritedButtons = screen.getAllByRole("button", {
          name: "❤️",
        });
        expect(unfavouritedButtons.length).toEqual(3);
        expect(screen.getAllByRole("img").length).toEqual(3);
      });
    });
  });
});
