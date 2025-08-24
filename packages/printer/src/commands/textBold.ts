import { createCommand, VAR } from './Command.js';
import { ESC } from './common.js';

/**
 * Turn emphasized mode on/off
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC E n  |
 * | Hex     | 1B 45 n  |
 * | Decimal | 27 69 n  |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/esc_ce.html
 */
export const textBold = createCommand('textBold', {
  format: [ESC, 0x45, VAR],
  write(n: number) {
    return [ESC, 0x45, n];
  },
});
