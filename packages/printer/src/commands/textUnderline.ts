import { ESC } from './common';

/**
 * Turn underline mode on/off
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC - n  |
 * | Hex     | 1B 2D n  |
 * | Decimal | 27 45 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=24
 */
export function textUnderline(n: number) {
  return [ESC, 0x2d, n];
}
