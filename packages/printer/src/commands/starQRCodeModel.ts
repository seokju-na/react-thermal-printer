import { ESC, GS } from './common';

/**
 * Set QR code model
 * | Format  | Value                   |
 * |---------|-------------------------|
 * | ASCII   | ESC  GS   y   S   0   n |
 * | Hex     |  1B  1D  79  53  30   n |
 * | Decimal |  27  29 121  83  48   n |
 *
 * | n | Set Model |
 * |---|-----------|
 * | 1 | Model1    |
 * | 2 | Model2    |
 *
 * @default n=2
 * @see https://www.starmicronics.com/support/Mannualfolder/escpos_cm_en.pdf
 */
export function starQRCodeModel(n = 2) {
  return [ESC, GS, 0x79, 0x53, 0x30, n];
}
