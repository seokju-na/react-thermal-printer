import { BasePrinter } from './BasePrinter';
import { CharacterSet } from './CharacterSet';

interface Options {
  characterSet?: CharacterSet;
}

export class StarPrinter extends BasePrinter {
  constructor(options?: Options) {
    super(options);
  }

  qrcode(): this {
    throw new Error('TODO');
  }
}
