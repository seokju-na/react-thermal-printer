import { Image } from '@react-thermal-printer/image';
import { CharacterSet } from './CharacterSet';
import {
  Align,
  BarcodeOptions,
  BarcodeType,
  CashDrawerPin,
  Printer,
  QRCodeOptions,
  TextFont,
  TextSize,
  TextUnderline,
} from './Printer';
import { alignment } from './commands/alignment';
import { barcodeHRIFont } from './commands/barcodeHRIFont';
import { barcodeHRIPosition } from './commands/barcodeHRIPosition';
import { barcodeHeight } from './commands/barcodeHeight';
import { barcodePrint } from './commands/barcodePrint';
import { barcodeWidth } from './commands/barcodeWidth';
import { cashdraw } from './commands/cashdraw';
import { characterSet } from './commands/characterSet';
import { LF } from './commands/common';
import { cut } from './commands/cut';
import { image } from './commands/image';
import { initialize } from './commands/initialize';
import { invert } from './commands/invert';
import { qrcodeCellSize } from './commands/qrcodeCellSize';
import { qrcodeCorrectionLevel } from './commands/qrcodeCorrectionLevel';
import { qrcodeModel } from './commands/qrcodeModel';
import { qrcodePrint } from './commands/qrcodePrint';
import { qrcodeStore } from './commands/qrcodeStore';
import { textBold } from './commands/textBold';
import { textFont } from './commands/textFont';
import { textMode } from './commands/textMode';
import { textSize } from './commands/textSize';
import { textUnderline } from './commands/textUnderline';
import { encode } from './encode';

export interface BasePrinterOptions {
  characterSet?: CharacterSet;
}

interface Cmd {
  name: string;
  args?: unknown[];
  data: number[];
}

export abstract class BasePrinter implements Printer {
  protected cmds: Cmd[] = [];
  protected characterSet: CharacterSet;

  protected constructor(options?: BasePrinterOptions) {
    this.characterSet = options?.characterSet ?? 'pc437_usa';
  }

  setCharacterSet(set: CharacterSet): this {
    this.characterSet = set;
    this.cmds.push({
      name: 'setCharacterSet',
      args: [set],
      data: characterSet(set),
    });
    return this;
  }

  setTextFont(font: TextFont): this {
    const n = (() => {
      switch (font) {
        case 'A':
          return 0;
        case 'B':
          return 1;
        case 'C':
          return 2;
        case 'D':
          return 3;
        case 'E':
          return 4;
        case 'special-A':
          return 97;
        case 'special-B':
          return 98;
      }
    })();

    this.cmds.push({
      name: 'setTextFont',
      args: [font],
      data: textFont(n),
    });
    return this;
  }

  setTextBold(bold: boolean): this {
    this.cmds.push({
      name: 'setTextBold',
      args: [bold],
      data: textBold(bold ? 1 : 0),
    });
    return this;
  }

  setTextUnderline(underline: TextUnderline): this {
    const n = (() => {
      switch (underline) {
        case '1dot-thick':
          return 1;
        case '2dot-thick':
          return 2;
        case 'none':
          return 0;
      }
    })();

    this.cmds.push({
      name: 'setTextUnderline',
      args: [underline],
      data: textUnderline(n),
    });
    return this;
  }

  setTextSize(width: TextSize, height: TextSize): this {
    const w = (width - 1) * 16;
    const h = height - 1;
    const n = w + h;

    this.cmds.push({
      name: 'setTextSize',
      args: [width, height],
      data: textSize(n),
    });
    return this;
  }

  setTextNormal(): this {
    this.cmds.push({
      name: 'setTextNormal',
      data: textMode(0),
    });
    return this;
  }

  setAlign(align: Align): this {
    const n = (() => {
      switch (align) {
        case 'left':
          return 0;
        case 'center':
          return 1;
        case 'right':
          return 2;
      }
    })();

    this.cmds.push({
      name: 'setAlign',
      args: [align],
      data: alignment(n),
    });
    return this;
  }

  invert(enabled: boolean): this {
    this.cmds.push({
      name: 'invert',
      args: [enabled],
      data: invert(enabled ? 1 : 0),
    });
    return this;
  }

  text(data: string): this {
    this.cmds.push({
      name: 'text',
      args: [data],
      data: Array.from(encode(data, this.characterSet)),
    });
    return this;
  }

  raw(data: Uint8Array): this {
    this.cmds.push({
      name: 'raw',
      args: [data],
      data: Array.from(data),
    });
    return this;
  }

  newLine(): this {
    this.cmds.push({
      name: 'newLine',
      data: [LF],
    });
    return this;
  }

  cut(): this {
    this.cmds.push({
      name: 'cut',
      data: cut(48),
    });
    return this;
  }

  image(data: Uint8Array, width: number, height: number): this {
    const size = new ArrayBuffer(4);
    const view = new DataView(size);
    view.setUint16(0, width / 8, true);
    view.setUint16(2, height, true);

    const [xL, xH, yL, yH] = [...new Uint8Array(size).values()] as [number, number, number, number];
    const img = new Image(data, width, height);

    this.cmds.push({
      name: 'image',
      args: [data.byteLength, width, height],
      data: image(0, xL, xH, yL, yH, img.toRaster()),
    });
    return this;
  }

  qrcode(data: string, options: QRCodeOptions = {}): this {
    const { model = 'model2', cellSize = 3, correction = 'L' } = options;
    const modelValue = (() => {
      switch (model) {
        case 'model1':
          return 49;
        case 'model2':
          return 50;
        case 'micro':
          return 51;
      }
    })();
    this.cmds.push({
      name: 'qrcodeModel',
      args: [model],
      data: qrcodeModel(modelValue),
    });

    this.cmds.push({
      name: 'qrcodeCellSize',
      args: [cellSize],
      data: qrcodeCellSize(cellSize),
    });

    const correctionValue = (() => {
      switch (correction) {
        case 'L':
          return 48;
        case 'M':
          return 49;
        case 'Q':
          return 50;
        case 'H':
          return 51;
      }
    })();
    this.cmds.push({
      name: 'qrcodeCorrection',
      args: [correction],
      data: qrcodeCorrectionLevel(correctionValue),
    });

    const encoded = encode(data, 'pc437_usa'); // ascii
    const length = new ArrayBuffer(2);
    const view = new DataView(length);
    view.setUint16(0, encoded.byteLength + 3, true);

    const pL = view.getUint8(0);
    const pH = view.getUint8(1);

    this.cmds.push({
      name: 'qrcodeStore',
      args: [data],
      data: qrcodeStore(pL, pH, encoded),
    });
    this.cmds.push({
      name: 'qrcodePrint',
      data: qrcodePrint(),
    });

    return this;
  }

  barcode(data: string, type: BarcodeType, options: BarcodeOptions = {}): this {
    const { hriPosition = 'none', hriFont = 'A', width = 3, height = 162 } = options;
    const hriPositionValue = (() => {
      switch (hriPosition) {
        case 'none':
          return 0;
        case 'top':
          return 1;
        case 'bottom':
          return 2;
        case 'top-bottom':
          return 3;
      }
    })();
    this.cmds.push({
      name: 'barcodeHRIPosition',
      args: [hriPosition],
      data: barcodeHRIPosition(hriPositionValue),
    });

    const hriFontValue = (() => {
      switch (hriFont) {
        case 'A':
          return 0;
        case 'B':
          return 1;
        case 'C':
          return 2;
        case 'D':
          return 3;
        case 'E':
          return 4;
        case 'special-A':
          return 97;
        case 'special-B':
          return 98;
      }
    })();
    this.cmds.push({
      name: 'barcodeHRIFont',
      args: [hriFont],
      data: barcodeHRIFont(hriFontValue),
    });

    this.cmds.push({
      name: 'barcodeWidth',
      args: [width],
      data: barcodeWidth(width),
    });
    this.cmds.push({
      name: 'barcodeHeight',
      args: [height],
      data: barcodeHeight(height),
    });

    const typeValue = (() => {
      switch (type) {
        case 'UPC-A':
          return 65;
        case 'UPC-E':
          return 66;
        case 'JAN13':
          return 67;
        case 'JAN8':
          return 68;
        case 'CODE39':
          return 69;
        case 'ITF':
          return 70;
        case 'CODABAR':
          return 71;
        case 'CODE93':
          return 72;
        case 'CODE128':
          return 73;
        case 'GS1-128':
          return 74;
        case 'GS1 (DataBar Omnidirectional)':
          return 75;
        case 'GS1 (DataBar Truncated)':
          return 76;
        case 'GS1 (DataBar Limited)':
          return 77;
        case 'GS1 (DataBar Expanded)':
          return 78;
      }
    })();
    const encoded = encode(data, 'pc437_usa'); // ascii
    this.cmds.push({
      name: 'barcodePrint',
      args: [data, type],
      data: barcodePrint(typeValue, encoded.byteLength, encoded),
    });

    return this;
  }

  cashdraw(pin: CashDrawerPin): this {
    const m = (() => {
      switch (pin) {
        case '2pin':
          return 0;
        case '5pin':
          return 1;
      }
    })();

    this.cmds.push({
      name: 'cashdraw',
      args: [pin],
      data: cashdraw(m, 0x19, 0x78),
    });

    return this;
  }

  initialize(): this {
    this.cmds.push({
      name: 'initialize',
      data: initialize(),
    });
    return this;
  }

  getData(): Uint8Array {
    const data = this.cmds.flatMap(x => x.data);
    return new Uint8Array(data);
  }

  clear(): this {
    this.cmds = [];
    return this;
  }

  debug(): this {
    // eslint-disable-next-line no-console
    console.debug(this.cmds);
    return this;
  }
}
