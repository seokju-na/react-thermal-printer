import { BasePrinter } from './BasePrinter';
import type { CharacterSet } from './CharacterSet';

interface Options {
  characterSet?: CharacterSet;
}

export class EpsonPrinter extends BasePrinter {
  constructor(options?: Options) {
    super(options);
  }
}
