import { BasePrinter } from './BasePrinter.js';
import {
  alignment,
  barcodeHeight,
  barcodeHRIFont,
  barcodeHRIPosition,
  barcodePrint,
  barcodeWidth,
  characterSet,
  cut,
  invert,
  LF,
  qrcodeCellSize,
  qrcodeCorrectionLevel,
  qrcodeModel,
  qrcodePrint,
  qrcodeStore,
  textBold,
  textFont,
  textMode,
  textSize,
  textUnderline,
} from './commands/index.js';
import { encode } from './iconv.js';

class TestPrinter extends BasePrinter {
  constructor() {
    super();
  }
}

it('clear', () => {
  const printer = new TestPrinter();
  printer.setTextSize(3, 4).setAlign('center').invert(true).cut().initialize().clear();

  expect(printer.getData()).toEqual(Uint8Array.from([]));
});

it('set character set', () => {
  const printer = new TestPrinter();
  printer.setCharacterSet('korea');
  expect(printer.getData()).toEqual(Uint8Array.from(characterSet('korea')));

  printer.clear();
  printer.setCharacterSet('wpc1254_turkish');
  expect(printer.getData()).toEqual(Uint8Array.from(characterSet('wpc1254_turkish')));
});

it('set text font', () => {
  const printer = new TestPrinter();

  printer.setTextFont('A');
  expect(printer.getData()).toEqual(Uint8Array.from(textFont.write(0)));

  printer.clear().setTextFont('B');
  expect(printer.getData()).toEqual(Uint8Array.from(textFont.write(1)));

  printer.clear().setTextFont('C');
  expect(printer.getData()).toEqual(Uint8Array.from(textFont.write(2)));

  printer.clear().setTextFont('D');
  expect(printer.getData()).toEqual(Uint8Array.from(textFont.write(3)));
});

it('set text bold', () => {
  const printer = new TestPrinter();

  printer.setTextBold(false);
  expect(printer.getData()).toEqual(Uint8Array.from(textBold.write(0)));

  printer.clear().setTextBold(true);
  expect(printer.getData()).toEqual(Uint8Array.from(textBold.write(1)));
});

it('set text underline', () => {
  const printer = new TestPrinter();

  printer.setTextUnderline('none');
  expect(printer.getData()).toEqual(Uint8Array.from(textUnderline.write(0)));

  printer.clear().setTextUnderline('1dot-thick');
  expect(printer.getData()).toEqual(Uint8Array.from(textUnderline.write(1)));

  printer.clear().setTextUnderline('2dot-thick');
  expect(printer.getData()).toEqual(Uint8Array.from(textUnderline.write(2)));
});

it('set text size', () => {
  const printer = new TestPrinter();

  printer.setTextSize(1, 1);
  expect(printer.getData()).toEqual(Uint8Array.from(textSize.write(0)));

  printer.clear().setTextSize(2, 2);
  expect(printer.getData()).toEqual(Uint8Array.from(textSize.write(17)));

  printer.clear().setTextSize(3, 4);
  expect(printer.getData()).toEqual(Uint8Array.from(textSize.write(0x23)));
});

it('set text normal', () => {
  const printer = new TestPrinter();
  printer.setTextNormal();

  expect(printer.getData()).toEqual(Uint8Array.from(textMode.write(0)));
});

it('set align', () => {
  const printer = new TestPrinter();

  printer.setAlign('left');
  expect(printer.getData()).toEqual(Uint8Array.from(alignment.write(0)));

  printer.clear().setAlign('center');
  expect(printer.getData()).toEqual(Uint8Array.from(alignment.write(1)));

  printer.clear().setAlign('right');
  expect(printer.getData()).toEqual(Uint8Array.from(alignment.write(2)));
});

it('invert', () => {
  const printer = new TestPrinter();

  printer.invert(false);
  expect(printer.getData()).toEqual(Uint8Array.from(invert.write(0)));

  printer.clear().invert(true);
  expect(printer.getData()).toEqual(Uint8Array.from(invert.write(1)));
});

it('text with default encoding (pc437_usa)', () => {
  const printer = new TestPrinter();
  const text = 'Hello, World!';

  printer.text(text);
  expect(printer.getData()).toEqual(Uint8Array.from(Buffer.from(text, 'ascii')));
});

it('text with custom encoding', () => {
  const printer = new TestPrinter();
  const text = '안녕하세요!';

  printer.setCharacterSet('korea').text(text);
  expect(printer.getData()).toEqual(Uint8Array.from([...characterSet('korea'), ...encode(text, 'korea')]));
});

it('new line', () => {
  const printer = new TestPrinter();

  printer.newLine();
  expect(printer.getData()).toEqual(Uint8Array.from([LF]));
});

it('cut', () => {
  const printer = new TestPrinter();

  printer.cut();
  expect(printer.getData()).toEqual(Uint8Array.from(cut.write(48)));
});

it('qrcode', () => {
  const printer = new TestPrinter();

  printer.qrcode('https://seokju.me', {
    model: 'model2',
    cellSize: 6,
    correction: 'Q',
  });
  expect(printer.getData()).toEqual(
    Uint8Array.from([
      ...qrcodeModel.write(50),
      ...qrcodeCellSize.write(6),
      ...qrcodeCorrectionLevel.write(50),
      ...qrcodeStore.write(20, 0, encode('https://seokju.me', 'pc437_usa')),
      ...qrcodePrint.write(),
    ])
  );
});

it('barcode', () => {
  const printer = new TestPrinter();
  const data = '1234567890';
  const encoded = Buffer.from(data, 'ascii');

  printer.barcode(data, 'CODE39', {
    hriPosition: 'top-bottom',
    hriFont: 'B',
    width: 4,
    height: 170,
  });
  expect(printer.getData()).toEqual(
    Uint8Array.from([
      ...barcodeHRIPosition.write(3),
      ...barcodeHRIFont.write(1),
      ...barcodeWidth.write(4),
      ...barcodeHeight.write(170),
      ...barcodePrint.write(69, encoded.byteLength, encoded),
    ])
  );
});
