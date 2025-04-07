import { VAR, createCommand } from './Command';
import { ESC } from './common';

/**
 * Select character code table
 * | Format   | Value     |
 * |---------|-----------|
 * | ASCII   | ESC t n   |
 * | Hex     | 1B 74 n   |
 * | Decimal | 27 116 n  |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/esc_lt.html
 */
export const characterCodeTable = createCommand('characterCodeTable', {
  format: [ESC, 0x74, VAR],
  write(n: number) {
    return [ESC, 0x74, n];
  },
});
