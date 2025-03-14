import { ESC } from './common';

/**
 * Turn underline mode on/off
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC - n  |
 * | Hex     | 1B 2D n  |
 * | Decimal | 27 45 n  |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/esc_minus.html
 */
export function textUnderline(n: number) {
  return [ESC, 0x2d, n];
}
