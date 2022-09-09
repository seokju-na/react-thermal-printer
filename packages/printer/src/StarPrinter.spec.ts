import { StarPrinter } from './StarPrinter';
import { starQRCodeCellSize } from './commands/starQRCodeCellSize';
import { starQRCodeCorrectionLevel } from './commands/starQRCodeCorrectionLevel';
import { starQRCodeModel } from './commands/starQRCodeModel';
import { starQRCodePrint } from './commands/starQRCodePrint';
import { starQRCodeStore } from './commands/starQRCodeStore';
import { encode } from './encode';

it('qrcode', () => {
  const printer = new StarPrinter();

  printer.qrcode('https://seokju.me', {
    model: 'model2',
    cellSize: 5,
    correction: 'M',
  });
  expect(printer.getData()).toEqual(
    Uint8Array.from([
      ...starQRCodeModel(2),
      ...starQRCodeCellSize(5),
      ...starQRCodeCorrectionLevel(1),
      ...starQRCodeStore(17, 0, encode('https://seokju.me', 'pc437_usa')),
      ...starQRCodePrint(),
    ])
  );
});
