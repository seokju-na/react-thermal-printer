import {
  starQRCodeCellSize,
  starQRCodeCorrectionLevel,
  starQRCodeModel,
  starQRCodePrint,
  starQRCodeStore,
} from './commands/index.js';
import { encode } from './iconv.js';
import { StarPrinter } from './StarPrinter.js';

it('qrcode', () => {
  const printer = new StarPrinter();

  printer.qrcode('https://seokju.me', {
    model: 'model2',
    cellSize: 5,
    correction: 'M',
  });
  expect(printer.getData()).toEqual(
    Uint8Array.from([
      ...starQRCodeModel.write(2),
      ...starQRCodeCellSize.write(5),
      ...starQRCodeCorrectionLevel.write(1),
      ...starQRCodeStore.write(17, 0, encode('https://seokju.me', 'pc437_usa')),
      ...starQRCodePrint.write(),
    ])
  );
});
