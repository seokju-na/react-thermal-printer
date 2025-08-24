import type { CharacterSet } from './CharacterSet.js';
import { EpsonPrinter } from './EpsonPrinter.js';
import type { Printer } from './Printer.js';
import { StarPrinter } from './StarPrinter.js';

export type PrinterType = 'epson' | 'star';
export type PrinterEncoder = (text: string, characterSet: CharacterSet) => Uint8Array;

export interface PrinterOptions {
  type: PrinterType;
  characterSet?: CharacterSet;
  /**
   * Encoder for text
   * @default uses encoder from "iconv-lite"
   */
  encoder?: PrinterEncoder;
}

export function getPrinter({ type, ...options }: PrinterOptions): Printer {
  switch (type) {
    case 'epson':
      return new EpsonPrinter(options);
    case 'star':
      return new StarPrinter(options);
  }
}

export type { CharacterSet } from './CharacterSet.js';
export * from './commands/index.js';
export type { DeserializedCommand, DeserializedCommandName } from './deserialize.js';
export { deserialize } from './deserialize.js';
export { EpsonPrinter } from './EpsonPrinter.js';
export { decode, encode } from './iconv.js';
export * from './Printer.js';
export { StarPrinter } from './StarPrinter.js';
