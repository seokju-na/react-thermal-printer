interface Pixel {
  r: number;
  g: number;
  b: number;
  a: number;
}

export class Image {
  private readonly pixels: Pixel[][];

  constructor(
    private readonly data: Uint8Array,
    private readonly width: number,
    private readonly height: number
  ) {
    this.pixels = this.getPixels(data, width, height);
    console.log(this.pixels);
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
