import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "../SearchForm";
import { fetchMock } from "../../../../utilities/fetchMock";
import { API_SEARCH_ENDPOINT } from "../../../../constants";
import { successfulResponse } from "../../testMocks";

describe("SearchForm Component", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("should render the search form", () => {
    render(<SearchForm />);
    expect(screen.getByPlaceholderText("What you looking for?")).toBeVisible();
    expect(screen.getByRole("button", { name: "Find GIF!" })).toBeVisible();
  });

  describe("when inputting a search term", () => {
    describe("if the input is too short", () => {
      it("should render a validation error", async () => {
        render(<SearchForm />);

        await act(async () => {
          await userEvent.type(
            screen.getByPlaceholderText("What you looking for?"),
            "te"
          );
          await userEvent.click(
            screen.getByRole("button", { name: "Find GIF!" })
          );
        });
        await waitFor(() => {
          expect(screen.getByText("Enter 3 letters or more!")).toBeVisible();
        });
      });

      it("should render a disabled submit", async () => {
        render(<SearchForm />);
        const button = screen.getByRole("button", { name: "Find GIF!" });

        await act(async () => {
          await userEvent.type(
            screen.getByPlaceholderText("What you looking for?"),
            "te"
          );
          await userEvent.click(button);
        });
        await waitFor(() => {
          expect(button).toHaveAttribute("disabled");
        });
      });
    });
  });

  describe("when initiating search", () => {
    it("should call the fetch API", async () => {
      fetchMock.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: successfulResponse }),
        })
      );
      render(<SearchForm />);

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
        expect(fetchMock).toHaveBeenCalledWith(
          `${API_SEARCH_ENDPOINT}&q=tennis&limit=12&offset=0`
        );
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
    });

    it("should reset the search input", async () => {
      render(<SearchForm />);
      const input = screen.getByPlaceholderText("What you looking for?");

      await act(async () => {
        await userEvent.type(input, "tennis");
      });
      await waitFor(() => {
        expect(input).toHaveValue("tennis");
      });
      await act(async () => {
        await userEvent.click(
          screen.getByRole("button", { name: "Find GIF!" })
        );
      });
      await waitFor(() => {
        expect(input).toHaveValue("");
      });
    });
  });
});
