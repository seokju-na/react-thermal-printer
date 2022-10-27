import { CharacterSet } from './CharacterSet';

export type Align = 'left' | 'center' | 'right';
export type TextFont = 'A' | 'B' | 'C' | 'D' | 'E' | 'special-A' | 'special-B';
export type TextSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type TextUnderline = '1dot-thick' | '2dot-thick' | 'none';
export interface QRCodeOptions {
  /** @default model2 */
  model?: 'model1' | 'model2' | 'micro';
  /** @default 3 */
  cellSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /**
   * Recovery Capacity (%)
   * - L : 7%
   * - M : 15%
   * - Q : 25%
   * - H : 30%
   * @default L
   */
  correction?: 'L' | 'M' | 'Q' | 'H';
}

/**
 * Type of barcode
 *
 * | Type                        | Characters (ASCII)                                                                 | Length              |
 * | --------------------------- | ---------------------------------------------------------------------------------- | ------------------- |
 * | UPC-A                       | 0-9                                                                                | 11, 12              |
 * | UPC-E                       | 0-9                                                                                | 6-8, 11, 12         |
 * | JAN13                       | 0-9                                                                                | 12, 13              |
 * | JAN8                        | 0-9                                                                                | 7, 8                |
 * | CODE39                      | 0-9, A-Z, SP, $, %, *, +, -, ., /                                                  | 1-255               |
 * | ITF                         | 0-9                                                                                | 2-256 (even number) |
 * | CODABAR                     | 0-9, A-D, a-d, $, +, -, ., /, :                                                    | 2-255               |
 * | CODE93                      | 00h-7Fh                                                                            | 1-255               |
 * | CODE128                     | 00h-7Fh                                                                            | 2-255               |
 * | GS1-128                     | NUL-SP(7Fh)                                                                        | 2-255               |
 * | GS1 DataBar Omnidirectional | 0-9                                                                                | 13                  |
 * | GS1 DataBar Truncated       | 0-9                                                                                | 13                  |
 * | GS1 DataBar Limited         | 0-9                                                                                | 13                  |
 * | GS1 DataBar Expanded        | 0-9, A-D, a-d, SP, !, ", %, $, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, _, {   | 2-255               |
 *
 * @see https://www.epson-biz.com/modules/ref_escpos/index.php?content_id=128
 */
export type BarcodeType =
  | 'UPC-A'
  | 'UPC-E'
  | 'JAN13'
  | 'JAN8'
  | 'CODE39'
  | 'ITF'
  | 'CODABAR'
  | 'CODE93'
  | 'CODE128'
  | 'GS1-128'
  | 'GS1 (DataBar Omnidirectional)'
  | 'GS1 (DataBar Truncated)'
  | 'GS1 (DataBar Limited)'
  | 'GS1 (DataBar Expanded)';

export interface BarcodeOptions {
  /** @default none */
  hriPosition?: 'none' | 'top' | 'bottom' | 'top-bottom';
  /** @default A */
  hriFont?: TextFont;
  /** @default 3 */
  width?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Available range 1-255
   * @default 162
   */
  height?: number;
}

export type CashDrawerPin = '2pin' | '5pin';

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
  image(data: Uint8Array, width: number, height: number): this;
  qrcode(data: string, options?: QRCodeOptions): this;
  barcode(data: string, type: BarcodeType, options?: BarcodeOptions): this;
  cashdraw(pin: CashDrawerPin): this;
  initialize(): this;
  getData(): Uint8Array;
  clear(): this;
  debug(): this;
}
