import type { FavouriteProps } from "../FavouriteButton";
import { FavouriteButton } from "../FavouriteButton";
import "./ImageCard.css";

type ImageCardId = string;

interface ImageCardProps extends FavouriteProps {
  id: ImageCardId;
  title: string;
  imageUrl: string;
  width: string;
  height: string;
  onClick: () => void;
}

export const ImageCard = ({
  id,
  title,
  imageUrl,
  width,
  height,
  favourited = false,
  onClick,
}: ImageCardProps) => {
  const handleClick = onClick;

  return (
    <div className="image-card" data-id={id}>
      <div className="image-card__container">
        <img
          src={imageUrl}
          alt={title}
          width={width}
          height={height}
          className="image-card__image"
        />
      </div>
      <FavouriteButton favourited={favourited} onClick={handleClick} />
    </div>
  );
};
