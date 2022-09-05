import { ESC } from './common';

/**
 * Select character font
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC M n  |
 * | Hex     | 1B 4D n  |
 * | Decimal | 27 7 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=27
 */
export function textFont(n: number) {
  return [ESC, 0x4d, n];
}
