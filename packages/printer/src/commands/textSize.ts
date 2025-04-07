import { VAR, createCommand } from './Command';
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
export const textSize = createCommand('textSize', {
  format: [GS, 0x21, VAR],
  write(n: number) {
    return [GS, 0x21, n];
  },
});
