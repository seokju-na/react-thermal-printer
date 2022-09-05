import { ESC } from './common';

/**
 * Select character code table
 * | Format   | Value     |
 * |---------|-----------|
 * | ASCII   | ESC t n   |
 * | Hex     | 1B 74 n   |
 * | Decimal | 27 116 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=32
 */
export function characterCodeTable(n: number) {
  return [ESC, 0x74, n];
}
