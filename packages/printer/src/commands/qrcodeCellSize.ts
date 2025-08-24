import { createCommand, VAR } from './Command.js';
import { GS } from './common.js';

/**
 * QR Code: Set the size of module
 * | Format   | Value                        |
 * |---------|-------------------------------|
 * | ASCII   | GS   (   k  pL  pH  cn  fn  n |
 * | Hex     | 1D  28  6B  03  00  31  43  n |
 * | Decimal | 29  40 107   3   0  49  67  n |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lparen_lk_fn167.html
 */
export const qrcodeCellSize = createCommand('qrcodeCellSize', {
  format: [GS, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x43, VAR],
  write(n: number) {
    return [GS, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x43, n];
  },
});
