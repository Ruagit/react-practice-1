import { API_SEARCH_ENDPOINT } from "../constants";
import { ImageType } from "../types";

interface SearchAction {
  search: string;
  searchLimit?: Number;
}

export const searchAction = async ({
  search,
  searchLimit = 12,
}: SearchAction): Promise<ImageType[] | Error> => {
  const params = `q=${search}&limit=${searchLimit}&offset=0`;
  try {
    const response = await fetch(`${API_SEARCH_ENDPOINT}&${params}`);
    const result = await response.json();

    if (result.data.length > 0) {
      const formattedData: ImageType[] = result.data.map((item: any) => {
        const image = item.images.downsized_large;
        return {
          id: item.id,
          title: item.title,
          imageUrl: image.url,
          width: image.width,
          height: image.height,
        };
      });

      return formattedData;
    }

    return [];
  } catch (err) {
    return err instanceof Error ? err : new Error(String(err));
  }
};
