import { ESC, GS } from './common';

/**
 * Set QR code cell size (Auto Setting)
 * | Format  | Value                                   |
 * |---------|-----------------------------------------|
 * | ASCII   | ESC GS   y   D   1   m  nL  nH  d1...dk |
 * | Hex     |  1B 1D  79  44  31   m  nL  nH  d1...dk |
 * | Decimal |  27 29 121  68  49   m  nL  nH  d1...dk |
 *
 * m = 0
 * @see https://www.starmicronics.com/support/Mannualfolder/escpos_cm_en.pdf
 */
export function starQRCodeStore(nL: number, nH: number, data: ArrayLike<number>) {
  const base = [ESC, GS, 0x79, 0x44, 0x31, 0, nL, nH];
  return base.concat(Array.from(data));
}
