import { useContext } from "react";
import { ImageCard } from "../../../../components/ImageCard";
import { ImageContext } from "../../../../hooks/imageContext";

// interface SearchResultsProps {
//   images: ImageType[];
// }

export const SearchResults = () => {
  const { images, favouriteImagesIds, removeFavouriteImage ,setFavouriteImages } = useContext(ImageContext);
  
  return (
    <div className="flex wrap">
      {images.length > 0 &&
      images.map((image) => (
        
        <><ImageCard
          key={image.id}
          id={image.id}
          imageUrl={image.imageUrl}
          title={image.title}
          width={image.width}
          height={image.height}
          favourited={favouriteImagesIds.includes(image.id)}
          onClick={() => favouriteImagesIds.includes(image.id) ? removeFavouriteImage(image)  : setFavouriteImages(image)} /><div>{image.id}</div></>
      ))}
    </div>
  );
};
