import { ESC } from './common';

/**
 * Initialize printer
 * | Format   | Value   |
 * |---------|------- --|
 * | ASCII   | ESC @   |
 * | Hex     | 1B 40   |
 * | Decimal | 27 64   |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=192
 */
export function initialize() {
  return [ESC, 0x40];
}
