/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Image } from './Image';

export interface ImageToRasterOptions {
  /**
   * Converts rgb color into black.
   * Returns true or 1 to fill black color.
   * If returns false or 0, will be empty pixel.
   *
   * @default a > 0 && (r + g + b) / 3 < 230
   */
  rgbToBlack?: (pixel: Pixel) => boolean | 1 | 0;
}

const defaultRgbToBlack = ({ r, g, b, a }: Pixel) => a > 0 && (r + g + b) / 3 < 230;

export function imageToRaster(
  image: Image,
  { rgbToBlack = defaultRgbToBlack }: ImageToRasterOptions = {}
): number[] {
  const pixels = getPixels(image);
  const raster: number[] = [];

  for (let i = 0; i < image.height; i++) {
    for (let j = 0; j < Math.ceil(image.width / 8); j++) {
      let byte = 0x0;
      for (let k = 0; k < 8; k++) {
        let pixel = pixels[i]?.[j * 8 + k];

        // Image overflow
        if (pixel === undefined) {
          pixel = {
            a: 0,
            r: 0,
            g: 0,
            b: 0,
          };
        }

        const color = rgbToBlack(pixel);
        // eslint-disable-next-line no-extra-boolean-cast
        if (Boolean(color)) {
          const mask = 1 << (7 - k);
          byte |= mask;
        }
      }
      raster.push(byte);
    }
  }
  return raster;
}

interface Pixel {
  r: number;
  g: number;
  b: number;
  a: number;
}

function getPixels(image: Image): Pixel[][] {
  const { data, width, height } = image;
  const pixels: Pixel[][] = [];

  for (let i = 0; i < height; i++) {
    const line: Pixel[] = [];

    for (let j = 0; j < width; j++) {
      const index = (width * i + j) << 2;
      line.push({
        r: data[index]!,
        g: data[index + 1]!,
        b: data[index + 2]!,
        a: data[index + 3]!,
      });
    }

    pixels.push(line);
  }

  return pixels;
}
