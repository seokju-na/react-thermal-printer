import { GS } from './common';

/**
 * Select character size
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | GS ! n  |
 * | Hex     | 1D 21 n  |
 * | Decimal | 29 33 n  |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_exclamation.html
 */
export function textSize(n: number) {
  return [GS, 0x21, n];
}
