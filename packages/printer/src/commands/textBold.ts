import { ESC } from './common';

/**
 * Turn emphasized mode on/off
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC E n  |
 * | Hex     | 1B 45 n  |
 * | Decimal | 27 69 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=25
 */
export function textBold(n: number) {
  return [ESC, 0x45, n];
}
