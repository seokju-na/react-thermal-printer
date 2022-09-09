import { ESC, GS } from './common';

/**
 * Set QR code cell
 * | Format  | Value                   |
 * |---------|-------------------------|
 * | ASCII   | ESC  GS   y   S   2   n |
 * | Hex     |  1B  1D  79  53  31   n |
 * | Decimal |  27  29 121  83  49   n |
 *
 * | n | Mistake Correction Level | Mistake Correction Rate (%) |
 * |---|--------------------------|-----------------------------|
 * | 0 | L                        | 7                           |
 * | 1 | M                        | 15                          |
 * | 2 | Q                        | 25                          |
 * | 3 | H                        | 30                          |
 *
 * @default n=0
 * @see https://www.starmicronics.com/support/Mannualfolder/escpos_cm_en.pdf
 */
export function starQRCodeCorrectionLevel(n = 0) {
  return [ESC, GS, 0x79, 0x53, 0x31, n];
}
