import { deserialize } from './deserialize';
import { getPrinter } from './index';

describe('deserialize', () => {
  it('deserialize correctly', () => {
    const printer = getPrinter({ type: 'epson', characterSet: 'korea' });
    const data = printer
      .initialize()
      .setCharacterSet('korea')
      .newLine()
      .barcode('1234567890', 'CODE128')
      .newLine()
      .setAlign('center')
      .text('Hello World')
      .setAlign('left')
      .newLine()
      .text('안녕하세요')
      .newLine()
      .qrcode('https://seokju.me')
      .cut(true)
      .getData();
    const parsed = deserialize(data);
    console.log(parsed);
    expect(parsed).toEqual([
      { name: 'initialize', data: [27, 64] },
      { name: 'internationalCharacterSet', data: [27, 82, 13] },
      { name: 'lf' },
      { name: 'barcodeHRIPosition', data: [29, 72, 0] },
      { name: 'barcodeHRIFont', data: [29, 102, 0] },
      { name: 'barcodeWidth', data: [29, 119, 3] },
      { name: 'barcodeHeight', data: [29, 104, 162] },
      {
        name: 'barcodePrint',
        data: [29, 107, 73, 10, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48],
      },
      { name: 'lf' },
      { name: 'alignment', data: [27, 97, 1] },
      { name: 'char', data: 72 },
      { name: 'char', data: 101 },
      { name: 'char', data: 108 },
      { name: 'char', data: 108 },
      { name: 'char', data: 111 },
      { name: 'char', data: 32 },
      { name: 'char', data: 87 },
      { name: 'char', data: 111 },
      { name: 'char', data: 114 },
      { name: 'char', data: 108 },
      { name: 'char', data: 100 },
      { name: 'alignment', data: [27, 97, 0] },
      { name: 'lf' },
      { name: 'char', data: 190 },
      { name: 'char', data: 200 },
      { name: 'char', data: 179 },
      { name: 'char', data: 231 },
      { name: 'char', data: 199 },
      { name: 'char', data: 207 },
      { name: 'char', data: 188 },
      { name: 'char', data: 188 },
      { name: 'char', data: 191 },
      { name: 'char', data: 228 },
      { name: 'lf' },
      {
        name: 'qrcodeModel',
        data: [29, 40, 107, 4, 0, 49, 65, 50, 0],
      },
      {
        name: 'qrcodeCellSize',
        data: [29, 40, 107, 3, 0, 49, 67, 3],
      },
      {
        name: 'qrcodeCorrectionLevel',
        data: [29, 40, 107, 3, 0, 49, 69, 48],
      },
      {
        name: 'qrcodeStore',
        data: [
          29, 40, 107, 20, 0, 49, 80, 48, 104, 116, 116, 112, 115, 58, 47, 47, 115, 101, 111, 107, 106, 117, 46, 109,
          101,
        ],
      },
      {
        name: 'qrcodePrint',
        data: [29, 40, 107, 3, 0, 49, 81, 48],
      },
      { name: 'cut', data: [29, 86, 49] },
    ]);
  });
});
