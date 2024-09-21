import type { CharacterSet } from './CharacterSet';
import { EpsonPrinter } from './EpsonPrinter';
import type { Printer } from './Printer';
import { StarPrinter } from './StarPrinter';

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

export type { CharacterSet } from './CharacterSet';
export * from './Printer';
export { EpsonPrinter } from './EpsonPrinter';
export { StarPrinter } from './StarPrinter';
