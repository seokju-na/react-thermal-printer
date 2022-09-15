interface Pixel {
  r: number;
  g: number;
  b: number;
  a: number;
}

function floyd_steinberg(image: any) {
  const imageData = image.data;
  const imageDataLength = imageData.length;
  const w = image.width;
  const lumR = [],
    lumG = [],
    lumB = [];

  let newPixel, err;

  for (let i = 0; i < 256; i++) {
    lumR[i] = i * 0.299;
    lumG[i] = i * 0.587;
    lumB[i] = i * 0.11;
  }

  // Greyscale luminance (sets r pixels to luminance of rgb)
  for (let i = 0; i <= imageDataLength; i += 4) {
    imageData[i] = Math.floor(
      lumR[imageData[i]]! + lumG[imageData[i + 1]]! + lumB[imageData[i + 2]]!
    );
  }

  for (let currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {
    // threshold for determining current pixel's conversion to a black or white pixel
    newPixel = imageData[currentPixel] < 150 ? 0 : 255;
    err = Math.floor((imageData[currentPixel] - newPixel) / 23);
    imageData[currentPixel + 0 * 1 - 0] = newPixel;
    imageData[currentPixel + 4 * 1 - 0] += err * 7;
    imageData[currentPixel + 4 * w - 4] += err * 3;
    imageData[currentPixel + 4 * w - 0] += err * 5;
    imageData[currentPixel + 4 * w + 4] += Number(err);
    // Set g and b values equal to r (effectively greyscales the image fully)
    imageData[currentPixel + 1] = imageData[currentPixel + 2] = imageData[currentPixel];
  }

  return image;
}

export class Image {
  private readonly pixels: Pixel[][];

  constructor(
    private readonly data: Uint8Array,
    private readonly width: number,
    private readonly height: number
  ) {
    const image = { data, width, height };
    const ditheredImage = floyd_steinberg(image);
    this.pixels = this.getPixels(ditheredImage.data, width, height);
  }

  toRaster(): number[] {
    const data: number[] = [];

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < Math.ceil(this.width / 8); j++) {
        let byte = 0x0;
        for (let k = 0; k < 8; k++) {
          let pixel = this.pixels[i]?.[j * 8 + k];

          // Image overflow
          if (pixel === undefined) {
            pixel = {
              a: 0,
              r: 0,
              g: 0,
              b: 0,
            };
          }

          if (pixel.a > 126) {
            // checking transparency
            const grayscale = parseInt(
              String(0.2126 * pixel.r + 0.7152 * pixel.g + 0.0722 * pixel.b)
            );

            if (grayscale < 128) {
              // checking color
              const mask = 1 << (7 - k); // setting bitwise mask
              byte |= mask; // setting the correct bit to 1
            }
          }
        }
        data.push(byte);
      }
    }
    return data;
  }

  private getPixels(data: Uint8Array, width: number, height: number): Pixel[][] {
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
}
