import { searchAction } from "./search";
import { API_SEARCH_ENDPOINT } from "../constants";
import { fetchMock, successfulResponse } from "../utilities/fetchMock";

describe("searchAction", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("should fetch data and format it correctly", async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(successfulResponse),
      })
    );

    const result = await searchAction({ search: "test query" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${API_SEARCH_ENDPOINT}&q=test query&limit=12&offset=0`
    );

    expect(result).toEqual([
      {
        id: successfulResponse.data[0].id,
        title: successfulResponse.data[0].title,
        imageUrl: successfulResponse.data[0].images.downsized_large.url,
        width: successfulResponse.data[0].images.downsized_large.width,
        height: successfulResponse.data[0].images.downsized_large.height,
      },
      {
        id: successfulResponse.data[1].id,
        title: successfulResponse.data[1].title,
        imageUrl: successfulResponse.data[1].images.downsized_large.url,
        width: successfulResponse.data[1].images.downsized_large.width,
        height: successfulResponse.data[1].images.downsized_large.height,
      },
      {
        id: successfulResponse.data[2].id,
        title: successfulResponse.data[2].title,
        imageUrl: successfulResponse.data[2].images.downsized_large.url,
        width: successfulResponse.data[2].images.downsized_large.width,
        height: successfulResponse.data[2].images.downsized_large.height,
      },
    ]);
  });

  it("should return an empty array if no results are found", async () => {
    const mockEmptyResponse = {
      data: [],
    };
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEmptyResponse),
      })
    );

    const result = await searchAction({ search: "no results query" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it("should use the provided searchLimit", async () => {
    const mockResponseData = {
      data: [],
    };
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
      })
    );

    await searchAction({ search: "test", searchLimit: 5 });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("limit=5"));
  });
});
