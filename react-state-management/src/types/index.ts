type ImageId = string;

export interface ImageType {
  id: ImageId;
  title: string;
  imageUrl: string;
  width: string;
  height: string;
  favourited: boolean;
}

export type ImageState = ImageType[] | [];

export interface ImageContextType {
  images: ImageState,
  favouriteImages: ImageState,
  favouriteImagesIds: string[]
  setImages: (images: ImageState) => void,
  setFavouriteImages: (favouriteImage: ImageType) => void,
  removeFavouriteImage: (favouriteImage: ImageType) => void

}