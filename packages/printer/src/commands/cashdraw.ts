import { ESC } from './common';

/**
 * Generate pulse
 * | Format  | Value                |
 * |---------|----------------------|
 * | ASCII   | ESC   p   m  t1   t2 |
 * | Hex     |  1B  70   m  t1   t2 |
 * | Decimal |  27  27   m  t1   t2 |
 *
 * @see https://www.epson-biz.com/modules/ref_escpos/index.php?content_id=128
 */
export function cashdraw(m: number, t1: number, t2: number) {
  return [ESC, 0x70, m, t1, t2];
}
