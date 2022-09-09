import { BasePrinter } from './BasePrinter';
import { CharacterSet } from './CharacterSet';

interface Options {
  characterSet?: CharacterSet;
}

export class EpsonPrinter extends BasePrinter {
  constructor(options?: Options) {
    super(options);
  }
}
