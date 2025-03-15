import { GS } from './common';

/**
 * Set barcode width
 * | Format  | Value      |
 * |---------|------------|
 * | ASCII   | GS   w   n |
 * | Hex     | 1D  77   n |
 * | Decimal | 29 119   n |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lw.html
 */
export function barcodeWidth(n: number) {
  return [GS, 0x77, n];
}
