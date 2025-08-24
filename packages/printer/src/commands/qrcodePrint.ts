import { createCommand } from './Command.js';
import { GS } from './common.js';

/**
 * QR Code: Print the symbol data in the symbol storage area
 * | Format   | Value                        |
 * |---------|-------------------------------|
 * | ASCII   | GS   (   k  pL  pH  cn  fn  m |
 * | Hex     | 1D  28  6B  03  00  31  51  m |
 * | Decimal | 29  40 107   3   0  49  81  m |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lparen_lk_fn181.html
 */
export const qrcodePrint = createCommand('qrcodePrint', {
  format: [GS, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x51, 48],
  write() {
    return [GS, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x51, 48];
  },
});
