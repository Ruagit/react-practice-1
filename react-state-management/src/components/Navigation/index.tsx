import { useLocation } from "wouter";
import { Link } from "../Link";
import { paths } from "../../constants";

interface isActiveTypes {
  currentPath: string;
  pathToCheck: string;
}

const isActive = ({ currentPath, pathToCheck }: isActiveTypes) =>
  currentPath === pathToCheck;

export const Nav = () => {
  const [location] = useLocation();
  const currentPath = location;
  return (
    <div className="navigation">
      <Link
        active={isActive({ currentPath, pathToCheck: paths.search })}
        href={paths.search}
      >
        Search
      </Link>
      <Link
        active={isActive({ currentPath, pathToCheck: paths.favourites })}
        href={paths.favourites}
      >
        Favourites
      </Link>
    </div>
  );
};
