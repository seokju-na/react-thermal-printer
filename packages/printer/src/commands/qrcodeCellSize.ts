import { GS } from './common';

/**
 * QR Code: Set the size of module
 * | Format   | Value                        |
 * |---------|-------------------------------|
 * | ASCII   | GS   (   k  pL  pH  cn  fn  n |
 * | Hex     | 1D  28  6B  03  00  31  43  n |
 * | Decimal | 29  40 107   3   0  49  67  n |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=141
 */
export function qrcodeCellSize(n: number) {
  return [GS, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x43, n];
}
