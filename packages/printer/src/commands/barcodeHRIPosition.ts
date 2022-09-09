import { GS } from './common';

/**
 * Select print position of HRI characters
 * | Format  | Value      |
 * |---------|------------|
 * | ASCII   | GS   H   n |
 * | Hex     | 1D  48   n |
 * | Decimal | 29  72   n |
 *
 * | n     | Print Position                   |
 * |-------|----------------------------------|
 * | 0, 48 | Not Printed                      |
 * | 1, 49 | Above the barcode                |
 * | 2, 50 | Below the barcode                |
 * | 3, 51 | Both above and below the barcode |
 *
 * @default n = 0
 * @see https://www.epson-biz.com/modules/ref_escpos/index.php?content_id=125
 */
export function barcodeHRIPosition(n = 0) {
  return [GS, 0x48, n];
}
