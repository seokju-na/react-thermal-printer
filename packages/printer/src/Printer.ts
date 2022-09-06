import { CharacterSet } from './CharacterSet';

export type Align = 'left' | 'center' | 'right';
export type TextFont = 'A' | 'B' | 'C' | 'D' | 'E' | 'special_A' | 'special_B';
export type TextSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type TextUnderline = '1dot_thick' | '2dot_thick' | 'none';

export interface Printer {
  setCharacterSet(set: CharacterSet): this;
  setTextFont(font: TextFont): this;
  setTextBold(bold: boolean): this;
  setTextSize(width: TextSize, height: TextSize): this;
  setTextUnderline(underline: TextUnderline): this;
  setTextNormal(): this;
  setAlign(align: Align): this;
  invert(enabled: boolean): this;
  text(data: string): this;
  raw(data: Uint8Array): this;
  newLine(): this;
  cut(): this;
  qrcode(url: string): this;
  initialize(): this;
  getData(): Uint8Array;
  clear(): this;
  debug(): this;
}
