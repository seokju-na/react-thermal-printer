import { BasePrinter } from './BasePrinter';
import type { CharacterSet } from './CharacterSet';
import type { QRCodeOptions } from './Printer';
import {
  starQRCodeCellSize,
  starQRCodeCorrectionLevel,
  starQRCodeModel,
  starQRCodePrint,
  starQRCodeStore,
} from './commands';
import { encode } from './iconv';

interface Options {
  characterSet?: CharacterSet;
}

export class StarPrinter extends BasePrinter {
  public constructor(options?: Options) {
    super(options);
  }

  qrcode(data: string, options: QRCodeOptions = {}): this {
    const { model = 'model2', cellSize = 3, correction = 'L' } = options;
    const modelValue = (() => {
      switch (model) {
        case 'model1':
          return 1;
        case 'model2':
          return 2;
        case 'micro':
          return 3;
      }
    })();
    this.cmds.push({
      name: 'qrcodeModel',
      args: [model],
      data: starQRCodeModel.write(modelValue),
    });

    this.cmds.push({
      name: 'qrcodeCellSize',
      args: [cellSize],
      data: starQRCodeCellSize.write(cellSize),
    });

    const correctionValue = (() => {
      switch (correction) {
        case 'L':
          return 0;
        case 'M':
          return 1;
        case 'Q':
          return 2;
        case 'H':
          return 3;
      }
    })();
    this.cmds.push({
      name: 'qrcodeCorrection',
      args: [correction],
      data: starQRCodeCorrectionLevel.write(correctionValue),
    });

    const encoded = encode(data, 'pc437_usa'); // ascii
    const length = new ArrayBuffer(2);
    const view = new DataView(length);
    view.setUint16(0, encoded.byteLength, true);

    const pL = view.getUint8(0);
    const pH = view.getUint8(1);

    this.cmds.push({
      name: 'qrcodeStore',
      args: [data],
      data: starQRCodeStore.write(pL, pH, encoded),
    });
    this.cmds.push({
      name: 'qrcodePrint',
      data: starQRCodePrint.write(),
    });

    return this;
  }
}
