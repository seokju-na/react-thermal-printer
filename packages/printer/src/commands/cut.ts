import { createCommand, VAR } from './Command.js';
import { GS } from './common.js';

/**
 * Select cut mode and cut paper
 * <Function A>
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | GS V m  |
 * | Hex     | 1D 56 m |
 * | Decimal | 29 86 m |
 *
 * <Function B, C, D>
 * | Format   | Value    |
 * |---------|-----------|
 * | ASCII   | GS V m n  |
 * | Hex     | 1D 56 m n |
 * | Decimal | 29 86 m n |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_cv.html
 */
export const cut = createCommand('cut', {
  format: [GS, 0x56, VAR],
  dynamic(data) {
    return data[2] === 0x41 || data[2] === 0x42 ? 1 : 0;
  },
  write(m: number) {
    if (m === 0x41 || m === 0x42) {
      return [GS, 0x56, m, 0];
    }
    return [GS, 0x56, m];
  },
});
