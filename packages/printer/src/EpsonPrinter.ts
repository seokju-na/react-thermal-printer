import { BasePrinter } from './BasePrinter.js';
import type { CharacterSet } from './CharacterSet.js';

interface Options {
  characterSet?: CharacterSet;
}

export class EpsonPrinter extends BasePrinter {
  constructor(options?: Options) {
    super(options);
  }
}
