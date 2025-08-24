import { createCommand, VAR } from './Command.js';
import { GS } from './common.js';

/**
 * QR Code: Select the error correction level
 * | Format   | Value                        |
 * |---------|-------------------------------|
 * | ASCII   | GS   (   k  pL  pH  cn  fn  n |
 * | Hex     | 1D  28  6B  03  00  31  45  n |
 * | Decimal | 29  40 107   0   0  49  69  n |
 *
 * @default n = 48
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lparen_lk_fn169.html
 */
export const qrcodeCorrectionLevel = createCommand('qrcodeCorrectionLevel', {
  format: [GS, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x45, VAR],
  write(n = 48) {
    return [GS, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x45, n];
  },
});
