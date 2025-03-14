import { GS } from './common';

/**
 * QR Code: Store the data in the symbol storage area
 * | Format   | Value                                  |
 * |---------|-----------------------------------------|
 * | ASCII   | GS   (   k  pL  pH  cn  fn   m  d1...dk |
 * | Hex     | 1D  28  6B  pL  pH  31  50  30  d1...dk |
 * | Decimal | 29  40 107  pL  pH  49  80  48  d1...dk |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lparen_lk_fn180.html
 */
export function qrcodeStore(pL: number, pH: number, data: ArrayLike<number>) {
  const base = [GS, 0x28, 0x6b, pL, pH, 0x31, 0x50, 0x30];
  return base.concat(Array.from(data));
}
