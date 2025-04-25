import { ImageCard } from "../../../../components/ImageCard";
import { ImageType } from "../../../../types";

interface SearchResultsProps {
  images: ImageType[];
}

export const SearchResults = ({ images }: SearchResultsProps) => {
  return (
    <div className="flex wrap">
      {images.length > 0 &&
        images.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            imageUrl={image.imageUrl}
            title={image.title}
            width={image.width}
            height={image.height}
            favourited={false}
            onClick={() => console.log(image.id)}
          />
        ))}
    </div>
  );
};
