import { SearchForm } from "./components/SearchForm";
import { SearchResults } from "./components/SearchResults";
import { useImages } from "../../hooks/useImages";

export const SearchPage = () => {
  const { images, saveImages } = useImages([]);

  return (
    <>
      <SearchForm saveImages={saveImages} />
      <SearchResults images={images} />
    </>
  );
};
