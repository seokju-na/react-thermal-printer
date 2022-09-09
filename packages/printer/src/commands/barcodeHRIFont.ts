import { GS } from './common';

/**
 * Select font for HRI characters
 * | Format  | Value      |
 * |---------|------------|
 * | ASCII   | GS   f   n |
 * | Hex     | 1D  66   n |
 * | Decimal | 29 102   n |
 *
 * | n     | Font of HRI characters           |
 * |-------|----------------------------------|
 * | 0, 48 | Font A                           |
 * | 1, 49 | Font B                           |
 * | 2, 50 | Font C                           |
 * | 3, 51 | Font D                           |
 * | 4, 52 | Font E                           |
 * | 97    | Special A                        |
 * | 98    | Special B                        |
 *
 * @see https://www.epson-biz.com/modules/ref_escpos/index.php?content_id=126
 */
export function barcodeHRIFont(n: number) {
  return [GS, 0x66, n];
}
