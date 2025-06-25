import { createContext } from "react";
import { ImageState, ImageType } from "../types";


export const ImageContext = createContext<{
  images: ImageState,
  favouriteImages: ImageState,
  favouriteImagesIds: string[],
  setImages: (images: ImageState) => void,
  setFavouriteImages: (favouriteImages: ImageType) => void,
  removeFavouriteImage: (favouriteImage: ImageType) => void,
}>({images: [], favouriteImages: [], favouriteImagesIds: [], setImages: () => {}, setFavouriteImages: () => {}, removeFavouriteImage: () => {}});