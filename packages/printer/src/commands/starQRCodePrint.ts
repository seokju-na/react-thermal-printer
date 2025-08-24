import { createCommand } from './Command.js';
import { ESC, GS } from './common.js';

/**
 * Print QR code
 * | Format  | Value           |
 * |---------|-----------------|
 * | ASCII   | ESC  GS   y   P |
 * | Hex     |  1B  1D  79  50 |
 * | Decimal |  27  29 121  80 |
 *
 * @see https://www.starmicronics.com/support/Mannualfolder/escpos_cm_en.pdf
 */
export const starQRCodePrint = createCommand('starQRCodePrint', {
  format: [ESC, GS, 0x79, 0x50],
  write() {
    return [ESC, GS, 0x79, 0x50];
  },
});
