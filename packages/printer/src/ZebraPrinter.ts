import type { Image, ImageToRasterOptions } from '@react-thermal-printer/image';
import type { CharacterSet } from './CharacterSet.js';
import type {
  Align,
  BarcodeOptions,
  BarcodeType,
  CashDrawerPin,
  Printer,
  QRCodeOptions,
  TextFont,
  TextSize,
  TextUnderline,
} from './Printer.js';

const DEFAULT_DPI = 203;
const DEFAULT_WIDTH_DOTS = DEFAULT_DPI * 2; // 2" wide label (406 dots @203dpi)
const DEFAULT_LINE_HEIGHT_RATE_PER_DPI = 0.15;
const BASE_CHAR_SIZE_DOTS = 20;

interface Cmd {
  name: string;
  args?: unknown[];
  data: string;
}

export interface ZebraPrinterOptions {
  /**
   * Printer resolution in dots per inch.
   * @default 203
   */
  dpi?: number;
  /**
   * Usable printable width in dots.
   * @default 406 (~2" @203dpi)
   */
  widthDots?: number;
}

export class ZebraPrinter implements Printer {
  private readonly dpi: number;
  private readonly coordinate: Coordinate;

  private font: TextFont = 'A';
  private bold: boolean = false;
  private align: Align = 'left';
  private charWidth: number = this.baseCharSize();
  private charHeight: number = this.baseCharSize();

  private cmds: Cmd[] = [];
  private labelOpen = false;

  public constructor({ widthDots, dpi }: ZebraPrinterOptions = {}) {
    this.dpi = dpi ?? DEFAULT_DPI;
    this.coordinate = new Coordinate(this.dpi, widthDots ?? DEFAULT_WIDTH_DOTS);
  }

  setCharacterSet(set: CharacterSet): this {
    const ci = (() => {
      switch (set) {
        case 'pc437_usa':
          return '0';
        case 'japan':
          return '12';
        default:
          return '28';
      }
    })();
    const commands = [`^CI${ci}`, `^CFJ,50`].join('\n');

    this.append('setCharacterSet', commands, [set]);
    return this;
  }

  setTextFont(font: TextFont): this {
    this.font = font;
    return this;
  }

  setTextBold(bold: boolean): this {
    this.bold = bold;
    return this;
  }

  setTextSize(width: TextSize, height: TextSize): this {
    this.charWidth = Math.floor(this.baseCharSize() * width);
    this.charHeight = Math.floor(this.baseCharSize() * height);
    this.coordinate.setLineHeight(this.charHeight * (1 + DEFAULT_LINE_HEIGHT_RATE_PER_DPI));

    return this;
  }

  setTextUnderline(_underline: TextUnderline): this {
    throw new Error('ZebraPrinter#setTextUnderline is not implemented yet.');
  }

  setTextNormal(): this {
    this.bold = false;
    this.font = 'A';
    this.charWidth = this.baseCharSize();
    this.charHeight = this.baseCharSize();
    this.coordinate.resetLineHeight();

    return this;
  }

  setAlign(align: Align): this {
    this.align = align;
    return this;
  }

  invert(_enabled: boolean): this {
    // TODO: implement barcode method

    // resetPrinter utils calls this method for cleanup, but zebra printers do not support
    // label inversion in the same way, so treat this as a no-op instead of throwing an error.
    return this;
  }

  text(data: string): this {
    const x = this.coordinate.getX();
    const y = this.coordinate.getY();
    const font = (() => {
      switch (this.font) {
        case 'A':
          return '6';
        case 'B':
          return '5';
        case 'C':
          return '4';
        case 'D':
          return '3';
        case 'E':
          return '2';
        case 'special-A':
          return '1';
        case 'special-B':
          return '0';
      }
    })();

    const fontCmd = `^A${font},${this.charHeight},${this.charWidth}`;
    const positionCmd = `^FB${this.coordinate.getUsableWidth()},1,0,${convertAlign(this.align)},0`;
    const commands = [[fontCmd, `^FO${x},${y}`, positionCmd, `^FD${data}^FS`].join('')];

    if (this.bold) {
      commands.push([fontCmd, `^FO${x + 1},${y}`, positionCmd, `^FD${data}^FS`].join(''));
    }

    this.append('text', commands.join('\n'), [data]);
    return this;
  }

  line(width: number, character: string = '-'): this {
    const count = Math.floor(width / this.baseCharSize()) * 3;
    this.text(character.repeat(count));
    return this;
  }

  raw(data: Uint8Array): this {
    const decoder = new TextDecoder('ascii', { fatal: false });
    this.append('raw', decoder.decode(data), [data]);
    return this;
  }

  newLine(): this {
    this.coordinate.newLine();
    return this;
  }

  cut(_partial?: boolean): this {
    throw new Error('ZPL-based printers do not provide cut method.');
  }

  image(_image: Image, _options?: ImageToRasterOptions): this {
    // TODO: implement image method
    throw new Error('ZebraPrinter#image is not implemented yet.');
  }

  qrcode(_data: string, _options?: QRCodeOptions): this {
    // TODO: implement qrcode method
    throw new Error('ZebraPrinter#qrcode is not implemented yet.');
  }

  barcode(_data: string, _type: BarcodeType, _options?: BarcodeOptions): this {
    // TODO: implement barcode method
    throw new Error('ZebraPrinter#barcode is not implemented yet.');
  }

  cashdraw(_pin: CashDrawerPin): this {
    throw new Error('ZPL-based printers do not provide cashdraw method.');
  }

  initialize(): this {
    if (!this.cmds.some(cmd => cmd.name === 'labelEnd')) {
      this.append('labelEnd', '^XZ');
    }

    this.labelOpen = false;
    return this;
  }

  getData(): Uint8Array {
    if (!this.cmds.some(cmd => cmd.name === 'labelEnd') && this.labelOpen) {
      this.append('labelEnd', '^XZ');
      this.labelOpen = false;
    }

    const payload = this.cmds.map(cmd => cmd.data).join('\n');
    return new TextEncoder().encode(payload);
  }

  clear(): this {
    this.cmds = [];
    this.labelOpen = false;

    this.font = 'A';
    this.bold = false;
    this.align = 'left';

    this.coordinate.reset();

    return this;
  }

  debug(): this {
    console.debug(this.cmds);
    return this;
  }

  convertTextAlignInRow(align: Align): Align {
    return align;
  }

  private append(name: string, command: string, args?: unknown[]) {
    if (!this.labelOpen) {
      this.cmds.push({ name: 'labelStart', data: '^XA' });
      this.labelOpen = true;
    }

    this.cmds.push({ name, args, data: command });
  }

  private baseCharSize(): number {
    const dpiScale = this.dpi / DEFAULT_DPI;
    return Math.floor(BASE_CHAR_SIZE_DOTS * dpiScale);
  }
}

class Coordinate {
  private x: number;
  private y: number;
  private dpi: number;
  private dotWidth: number;
  private lineHeight: number;
  private home: { x: number; y: number };

  public constructor(dpi: number, dotWidth: number) {
    this.dpi = dpi;
    this.dotWidth = dotWidth;
    this.lineHeight = Math.floor(dpi * DEFAULT_LINE_HEIGHT_RATE_PER_DPI);

    const padding = Math.floor(dotWidth * 0.05);
    this.home = { x: padding, y: padding };
    this.x = this.home.x;
    this.y = this.home.y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getUsableWidth() {
    return this.dotWidth - this.home.x * 2;
  }

  newLine(lineHeight?: number) {
    this.x = this.home.x;
    this.y += lineHeight ?? this.lineHeight;
  }

  setLineHeight(lineHeight: number) {
    this.lineHeight = lineHeight;
  }

  resetLineHeight() {
    this.lineHeight = Math.floor(this.dpi * DEFAULT_LINE_HEIGHT_RATE_PER_DPI);
  }

  reset() {
    this.x = this.home.x;
    this.y = this.home.y;
    this.resetLineHeight();
  }
}

function convertAlign(align: Align) {
  switch (align) {
    case 'center':
      return 'C';
    case 'right':
      return 'R';
    case 'left':
      return 'L';
  }
}
