import { ESC } from './common';

/**
 * Select an international character set
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC R n  |
 * | Hex     | 1B 52 n  |
 * | Decimal | 27 82 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=29
 */
export function internationalCharacterSet(n: number) {
  return [ESC, 0x52, n];
}
