import { GS } from './common';

/**
 * Set barcode height
 * | Format  | Value      |
 * |---------|------------|
 * | ASCII   | GS   h   n |
 * | Hex     | 1D  68   n |
 * | Decimal | 29 104   n |
 *
 * @see https://www.epson-biz.com/modules/ref_escpos/index.php?content_id=127
 */
export function barcodeHeight(n: number) {
  return [GS, 0x68, n];
}
