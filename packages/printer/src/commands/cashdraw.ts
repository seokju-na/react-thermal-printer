import { VAR, createCommand } from './Command';
import { ESC } from './common';

/**
 * Generate pulse
 * | Format  | Value                |
 * |---------|----------------------|
 * | ASCII   | ESC   p   m  t1   t2 |
 * | Hex     |  1B  70   m  t1   t2 |
 * | Decimal |  27  27   m  t1   t2 |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/esc_lp.html
 */
export const cashdraw = createCommand('cashdraw', {
  format: [ESC, 0x70, VAR, VAR, VAR],
  write(m: number, t1: number, t2: number) {
    return [ESC, 0x70, m, t1, t2];
  },
});
