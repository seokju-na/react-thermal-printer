import { createCommand, VAR } from './Command.js';
import { ESC } from './common.js';

/**
 * Select print mode(s)
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC ! n  |
 * | Hex     | 1B 21 n  |
 * | Decimal | 27 33 n  |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/esc_exclamation.html
 */
export const textMode = createCommand('textMode', {
  format: [ESC, 0x21, VAR],
  write(n: number) {
    return [ESC, 0x21, n];
  },
});
