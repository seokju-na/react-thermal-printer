import { GS } from './common';

/**
 * Select cut mode and cut paper
 * <Function A>
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | GS V m  |
 * | Hex     | 1D 56 m |
 * | Decimal | 29 86 m |
 *
 * <Function B, C, D>
 * | Format   | Value    |
 * |---------|-----------|
 * | ASCII   | GS V m n  |
 * | Hex     | 1D 56 m n |
 * | Decimal | 29 86 m n |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_cv.html
 */
export function cut(m: number, n?: number) {
  const cmd = [GS, 0x56, m];
  if (n != null) {
    cmd.push(n);
  }
  return cmd;
}
