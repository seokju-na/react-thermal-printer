import { GS } from './common';

/**
 * QR Code: Select the model
 * | Format   | Value                             |
 * |---------|------------------------------------|
 * | ASCII   | GS   (   k  pL  pH  cn  fn  n1  n2 |
 * | Hex     | 1D  28  6B  04  00  31  41  n1  n2 |
 * | Decimal | 29  40 107   4   0  49  65  n1  n2 |
 *
 * @default n1=50, n2=0
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=140
 */
export function qrcodeModel(n1 = 50, n2 = 0) {
  return [GS, 0x28, 0x6b, 0x04, 0x00, 0x31, 0x41, n1, n2];
}
