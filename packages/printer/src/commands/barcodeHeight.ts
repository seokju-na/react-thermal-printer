import { GS } from './common';

/**
 * Set barcode height
 * | Format  | Value      |
 * |---------|------------|
 * | ASCII   | GS   h   n |
 * | Hex     | 1D  68   n |
 * | Decimal | 29 104   n |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lh.html
 */
export function barcodeHeight(n: number) {
  return [GS, 0x68, n];
}
