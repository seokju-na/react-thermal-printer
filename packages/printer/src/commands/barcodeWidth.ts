import { GS } from './common';

/**
 * Set barcode width
 * | Format  | Value      |
 * |---------|------------|
 * | ASCII   | GS   w   n |
 * | Hex     | 1D  77   n |
 * | Decimal | 29 119   n |
 *
 * @see https://www.epson-biz.com/modules/ref_escpos/index.php?content_id=129
 */
export function barcodeWidth(n: number) {
  return [GS, 0x77, n];
}
