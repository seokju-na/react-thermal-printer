import { ESC } from './common';

/**
 * Select print mode(s)
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC ! n  |
 * | Hex     | 1B 21 n  |
 * | Decimal | 27 33 n  |
 *
 * @see https://www.epson-biz.com/modules/ref_escpos/index.php?content_id=23
 */
export function textMode(n: number) {
  return [ESC, 0x21, n];
}
