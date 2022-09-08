import { BasePrinter, BasePrinterOptions } from './BasePrinter';
import { alignment } from './commands/alignment';
import { characterSet } from './commands/characterSet';
import { LF } from './commands/common';
import { cut } from './commands/cut';
import { invert } from './commands/invert';
import { textBold } from './commands/textBold';
import { textFont } from './commands/textFont';
import { textMode } from './commands/textMode';
import { textSize } from './commands/textSize';
import { textUnderline } from './commands/textUnderline';
import { encode } from './encode';

class TestPrinter extends BasePrinter {
  constructor(options?: BasePrinterOptions) {
    super(options);
  }

  qrcode(): this {
    throw new Error();
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
  expect(printer.getData()).toEqual(Uint8Array.from(textFont(0)));

  printer.clear().setTextFont('B');
  expect(printer.getData()).toEqual(Uint8Array.from(textFont(1)));

  printer.clear().setTextFont('C');
  expect(printer.getData()).toEqual(Uint8Array.from(textFont(2)));

  printer.clear().setTextFont('D');
  expect(printer.getData()).toEqual(Uint8Array.from(textFont(3)));
});

it('set text bold', () => {
  const printer = new TestPrinter();

  printer.setTextBold(false);
  expect(printer.getData()).toEqual(Uint8Array.from(textBold(0)));

  printer.clear().setTextBold(true);
  expect(printer.getData()).toEqual(Uint8Array.from(textBold(1)));
});

it('set text underline', () => {
  const printer = new TestPrinter();

  printer.setTextUnderline('none');
  expect(printer.getData()).toEqual(Uint8Array.from(textUnderline(0)));

  printer.clear().setTextUnderline('1dot_thick');
  expect(printer.getData()).toEqual(Uint8Array.from(textUnderline(1)));

  printer.clear().setTextUnderline('2dot_thick');
  expect(printer.getData()).toEqual(Uint8Array.from(textUnderline(2)));
});

it('set text size', () => {
  const printer = new TestPrinter();

  printer.setTextSize(1, 1);
  expect(printer.getData()).toEqual(Uint8Array.from(textSize(0)));

  printer.clear().setTextSize(2, 2);
  expect(printer.getData()).toEqual(Uint8Array.from(textSize(17)));

  printer.clear().setTextSize(3, 4);
  expect(printer.getData()).toEqual(Uint8Array.from(textSize(0x23)));
});

it('set text normal', () => {
  const printer = new TestPrinter();
  printer.setTextNormal();

  expect(printer.getData()).toEqual(Uint8Array.from(textMode(0)));
});

it('set align', () => {
  const printer = new TestPrinter();

  printer.setAlign('left');
  expect(printer.getData()).toEqual(Uint8Array.from(alignment(0)));

  printer.clear().setAlign('center');
  expect(printer.getData()).toEqual(Uint8Array.from(alignment(1)));

  printer.clear().setAlign('right');
  expect(printer.getData()).toEqual(Uint8Array.from(alignment(2)));
});

it('invert', () => {
  const printer = new TestPrinter();

  printer.invert(false);
  expect(printer.getData()).toEqual(Uint8Array.from(invert(0)));

  printer.clear().invert(true);
  expect(printer.getData()).toEqual(Uint8Array.from(invert(1)));
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
  expect(printer.getData()).toEqual(
    Uint8Array.from([...characterSet('korea'), ...encode(text, 'korea')])
  );
});

it('new line', () => {
  const printer = new TestPrinter();

  printer.newLine();
  expect(printer.getData()).toEqual(Uint8Array.from([LF]));
});

it('cut', () => {
  const printer = new TestPrinter();

  printer.cut();
  expect(printer.getData()).toEqual(Uint8Array.from(cut(48)));
});
