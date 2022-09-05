import { GS } from './common';

/**
 * Select character size
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | GS ! n  |
 * | Hex     | 1D 21 n  |
 * | Decimal | 29 33 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=34
 */
export function textSize(n: number) {
  return [GS, 0x21, n];
}
