import { useState } from "react";
import { ImageState } from "../types";

export const useImages = (initialValue: ImageState = []) => {
  const [images, setImages] = useState<ImageState>(initialValue);

  const saveImages = (images: ImageState) => {
    setImages(images);
    return images;
  };

  return {
    images,
    saveImages,
  };
};
