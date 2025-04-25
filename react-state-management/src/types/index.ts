type ImageId = string;

export interface ImageType {
  id: ImageId;
  title: string;
  imageUrl: string;
  width: string;
  height: string;
}

export type ImageState = ImageType[] | [];
