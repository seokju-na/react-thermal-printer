import { createCommand, VAR } from './Command.js';
import { ESC, GS } from './common.js';

/**
 * Set QR code cell
 * | Format   | Value                  |
 * |---------|-------------------------|
 * | ASCII   | ESC  GS   y   S   2   n |
 * | Hex     |  1B  1D  79  53  32   n |
 * | Decimal |  27  29 121  83  50   n |
 *
 * @default n=3
 * @see https://www.starmicronics.com/support/Mannualfolder/escpos_cm_en.pdf
 */
export const starQRCodeCellSize = createCommand('starQRCodeCellSize', {
  format: [ESC, GS, 0x79, 0x53, 0x32, VAR],
  write(n = 3) {
    return [ESC, GS, 0x79, 0x53, 0x32, n];
  },
});
