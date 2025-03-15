import { GS } from './common';

/**
 * Print barcode
 * | Format  | Value                    |
 * |---------|--------------------------|
 * | ASCII   | GS   k   m   n   d1...dn |
 * | Hex     | 1D  6B   m   n   d1...dn |
 * | Decimal | 29 107   m   n   d1...dn |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lk.html
 */
export function barcodePrint(m: number, n: number, data: ArrayLike<number>) {
  const base = [GS, 0x6b, m, n];
  return base.concat(Array.from(data));
}
