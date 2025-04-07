import { VAR, createCommand } from './Command';
import { ESC } from './common';

/**
 * Select character font
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC M n  |
 * | Hex     | 1B 4D n  |
 * | Decimal | 27 7 n  |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/esc_cm.html
 */
export const textFont = createCommand('textFont', {
  format: [ESC, 0x4d, VAR],
  write(n: number) {
    return [ESC, 0x4d, n];
  },
});
