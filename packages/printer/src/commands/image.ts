import { createCommand, VAR } from './Command.js';
import { GS } from './common.js';

/**
 * Print raster bit image
 * | Format   | Value                          |
 * |---------|---------------------------------|
 * | ASCII   | GS v 0 m xL xH yL yH d1...dk    |
 * | Hex     | 1D 76 30 m xL xH yL yH d1...dk  |
 * | Decimal | 29 118 48 m xL xH yL yH d1...dk |
 *
 * @see https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lv_0.html
 */
export const image = createCommand('image', {
  format: [GS, 0x76, 0x30, VAR, VAR, VAR, VAR, VAR],
  dynamic(data) {
    const size = new ArrayBuffer(4);
    const view = new DataView(size);
    view.setUint8(0, data[5]!);
    view.setUint8(1, data[4]!);
    view.setUint8(2, data[7]!);
    view.setUint8(3, data[6]!);
    return view.getUint16(0) * view.getUint16(2);
  },
  write(m: number, xL: number, xH: number, yL: number, yH: number, data: ArrayLike<number>) {
    const base = [GS, 0x76, 0x30, m, xL, xH, yL, yH];
    return base.concat(Array.from(data));
  },
});
