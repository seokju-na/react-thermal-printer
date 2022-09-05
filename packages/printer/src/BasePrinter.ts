import { CharacterSet } from './CharacterSet';
import { Align, Printer, TextFont, TextSize, TextUnderline } from './Printer';
import { alignment } from './commands/alignment';
import { characterSet } from './commands/characterSet';
import { LF } from './commands/common';
import { cut } from './commands/cut';
import { initialize } from './commands/initialize';
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
        case 'special_A':
          return 97;
        case 'special_B':
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
        case '1dot_thick':
          return 1;
        case '2dot_thick':
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
    console.debug(this.cmds);
    return this;
  }

  abstract qrcode(url: string): this;
}
