declare global {
  interface Window {
    GIPHY_API_KEY: string;
  }
}

export const API_SEARCH_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${window.GIPHY_API_KEY}`;

export const paths = {
  search: "/",
  favourites: "/favourites",
};
