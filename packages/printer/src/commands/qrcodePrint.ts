import { GS } from './common';

/**
 * QR Code: Print the symbol data in the symbol storage area
 * | Format   | Value                        |
 * |---------|-------------------------------|
 * | ASCII   | GS   (   k  pL  pH  cn  fn  m |
 * | Hex     | 1D  28  6B  03  00  31  51  m |
 * | Decimal | 29  40 107   3   0  49  81  m |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=144
 */
export function qrcodePrint() {
  return [GS, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x51, 48];
}
