import { useContext } from "react";
import { ImageCard } from "../../components/ImageCard";
import { ImageContext } from "../../hooks/imageContext";

export const FavouritesPage = () => {
  const { favouriteImages, favouriteImagesIds, removeFavouriteImage } = useContext(ImageContext);
  return (
  <div className="flex wrap">



{favouriteImages.length > 0 &&
        favouriteImages.map((image) => (
          <><ImageCard
            key={image.id}
            id={image.id}
            imageUrl={image.imageUrl}
            title={image.title}
            width={image.width}
            height={image.height}
            favourited={favouriteImagesIds.includes(image.id)}
            onClick={() => removeFavouriteImage(image)} /><div>{image.id}</div></>
        ))}

  </div>
  );
};
