import { GS } from './common';

/**
 * QR Code: Select the error correction level
 * | Format   | Value                        |
 * |---------|-------------------------------|
 * | ASCII   | GS   (   k  pL  pH  cn  fn  n |
 * | Hex     | 1D  28  6B  03  00  31  45  n |
 * | Decimal | 29  40 107   0   0  49  69  n |
 *
 * @default n = 48
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=142
 */
export function qrcodeCorrectionLevel(n = 48) {
  return [GS, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x45, n];
}
