import { SearchForm } from "./components/SearchForm";
import { SearchResults } from "./components/SearchResults";

export const SearchPage = () => {
  // const { images, saveImages } = useImages([]);

  return (
    <>
      <SearchForm />
      <SearchResults/>
    </>
  );
};
