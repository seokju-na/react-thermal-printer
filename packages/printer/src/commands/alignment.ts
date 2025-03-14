import { ESC } from './common';

/**
 * Select justification
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC a n  |
 * | Hex     | 1B 61 n  |
 * | Decimal | 27 97 n  |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/esc_la.html
 */
export function alignment(n: number) {
  return [ESC, 0x61, n];
}
