import { GS } from './common';

/**
 * Specify/cancel white/black inverted printing
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | GS b n   |
 * | Hex     | 1D 42 n  |
 * | Decimal | 29 66 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=25
 */
export function invert(n: number) {
  return [GS, 0x42, n];
}
