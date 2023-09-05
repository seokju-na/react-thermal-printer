import { Image } from '../Image';

export interface ImageTransform {
  (image: Image): Image;
}
