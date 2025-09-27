import type { Image as ImageData, ImageToRasterOptions, ImageTransform } from '@react-thermal-printer/image';
import type { Align } from '@react-thermal-printer/printer';
import type { ReactElement } from 'react';
import type { ExtendHTMLProps } from '../types/HTMLProps.js';
import type { Printable } from '../types/Printable.js';
import { classNames } from '../utils/classnames.js';
import { readImage } from '../utils/readImage.js';

export type ImageProps = ExtendHTMLProps<
  'img',
  {
    align?: Align;
    src: string;
    /**
     * Image transformer.
     * @example
     * // Greyscale dithering with floyd-steinberg algorithm.
     * import { transforms } from '@react-thermal-printer/image';
     *
     * <Image transforms={[transforms.floydSteinberg]} {...} />
     */
    transforms?: ImageTransform[];
    rgbToBlack?: ImageToRasterOptions['rgbToBlack'];
    /**
     * Image data reader
     * @default read data from <img /> and <canvas />
     */
    reader?: (elem: ReactElement<ImageProps>) => Promise<ImageData>;
  }
>;

/**
 * @public
 * @name Image
 * @category components
 * @signature
 * ```tsx
 * function Image(props: ImageProps): JSX.Element;
 * ```
 *
 * @description
 * Print image bitmap.
 *
 * ```tsx
 * <Image src="https://my-cdn.com/image.png" />
 * <Image align="center" src="https://my-cdn.com/image.png" />
 * <Image src="https://my-cdn.com/image.png" reader={myCustomImageReader} />
 *
 * // A custom reader for reading image binary data.
 * function myCustomImageReader(
 *   elem: ReactElement<ComponentProps<typeof Image>>
 * ): Promise<Image>;
 * ```
 *
 * By passing transform functions, image can be converted.
 *
 * The example below applies the [Floyd-Steinberg dithering](https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering) algorithm:
 * ```tsx
 * import { transforms } from '@react-thermal-printer/image';
 *
 * <Image src="https://my-cdn.com/image.png" transforms={[transforms.floydSteinberg]} />
 * ```
 */
export const ImageComp: Printable<ImageProps> = ({ align, src, reader: _, className, ...props }: ImageProps) => {
  return <img data-align={align} data-src={src} src={src} className={classNames('rtp-image', className)} {...props} />;
};

ImageComp.print = async (elem, { printer }) => {
  const { align, transforms = [], rgbToBlack, reader = ({ props: { src } }) => readImage(src) } = elem.props;
  let image = await reader(elem);
  for (const transform of transforms) {
    image = transform(image);
  }

  if (align != null) {
    printer.setAlign(align);
  }
  printer.image(image, { rgbToBlack });
};
