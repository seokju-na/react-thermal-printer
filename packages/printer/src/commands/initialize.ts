import { createCommand } from './Command';
import { ESC } from './common';

/**
 * Initialize printer
 * | Format   | Value   |
 * |---------|------- --|
 * | ASCII   | ESC @   |
 * | Hex     | 1B 40   |
 * | Decimal | 27 64   |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/esc_atsign.html
 */
export const initialize = createCommand('initialize', {
  format: [ESC, 0x40],
  write() {
    return [ESC, 0x40];
  },
});
