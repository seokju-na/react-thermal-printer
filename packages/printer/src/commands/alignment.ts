import { ESC } from './common';

/**
 * Select justification
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC a n  |
 * | Hex     | 1B 61 n  |
 * | Decimal | 27 97 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=58
 */
export function alignment(n: number) {
  return [ESC, 0x61, n];
}
