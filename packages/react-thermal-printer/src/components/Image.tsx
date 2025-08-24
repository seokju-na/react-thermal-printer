import type { Image as ImageData, ImageToRasterOptions, ImageTransform } from '@react-thermal-printer/image';
import type { Align } from '@react-thermal-printer/printer';
import type { ReactElement } from 'react';
import type { ExtendHTMLProps } from '../types/HTMLProps.js';
import type { Printable } from '../types/Printable.js';
import { classNames } from '../utils/classnames.js';
import { readImage } from '../utils/readImage.js';

type Props = ExtendHTMLProps<
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
    reader?: (elem: ReactElement<Props>) => Promise<ImageData>;
  }
>;

export const Image: Printable<Props> = ({ align, src, reader: _, className, ...props }: Props) => {
  return <img data-align={align} data-src={src} src={src} className={classNames('rtp-image', className)} {...props} />;
};

Image.print = async (elem, { printer }) => {
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
