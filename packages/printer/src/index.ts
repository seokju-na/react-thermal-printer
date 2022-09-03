import { CharacterSet } from './CharacterSet';
import { EpsonPrinter } from './EpsonPrinter';
import { Printer } from './Printer';
import { StarPrinter } from './StarPrinter';

export type PrinterType = 'epson' | 'star';

export interface PrinterOptions {
  type: PrinterType;
  characterSet?: CharacterSet;
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
