import { GS } from './common';

/**
 * Print raster bit image
 * | Format   | Value                          |
 * |---------|---------------------------------|
 * | ASCII   | GS v 0 m xL xH yL yH d1...dk    |
 * | Hex     | 1D 76 30 m xL xH yL yH d1...dk  |
 * | Decimal | 29 118 48 m xL xH yL yH d1...dk |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=94
 */
export function image(
  m: number,
  xL: number,
  xH: number,
  yL: number,
  yH: number,
  data: ArrayLike<number>
) {
  const base = [GS, 0x76, 0x30, m, xL, xH, yL, yH];
  return base.concat(Array.from(data));
}
