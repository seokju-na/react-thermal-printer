import { createCommand, VAR } from './Command.js';
import { GS } from './common.js';

/**
 * Select font for HRI characters
 * | Format  | Value      |
 * |---------|------------|
 * | ASCII   | GS   f   n |
 * | Hex     | 1D  66   n |
 * | Decimal | 29 102   n |
 *
 * | n     | Font of HRI characters           |
 * |-------|----------------------------------|
 * | 0, 48 | Font A                           |
 * | 1, 49 | Font B                           |
 * | 2, 50 | Font C                           |
 * | 3, 51 | Font D                           |
 * | 4, 52 | Font E                           |
 * | 97    | Special A                        |
 * | 98    | Special B                        |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lf.html
 */
export const barcodeHRIFont = createCommand('barcodeHRIFont', {
  format: [GS, 0x66, VAR],
  write(n: number) {
    return [GS, 0x66, n];
  },
});
