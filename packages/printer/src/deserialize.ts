import type { InferCommandName } from './commands/Command.js';
import {
  alignment,
  barcodeHeight,
  barcodeHRIFont,
  barcodeHRIPosition,
  barcodePrint,
  barcodeWidth,
  type Command,
  cashdraw,
  characterCodeTable,
  cut,
  image,
  initialize,
  internationalCharacterSet,
  invert,
  LF,
  qrcodeCellSize,
  qrcodeCorrectionLevel,
  qrcodeModel,
  qrcodePrint,
  qrcodeStore,
  starQRCodeCellSize,
  starQRCodeCorrectionLevel,
  starQRCodeModel,
  starQRCodePrint,
  starQRCodeStore,
  textBold,
  textFont,
  textMode,
  textSize,
  textUnderline,
  VAR,
} from './commands/index.js';

const commands = [
  alignment,
  barcodeHeight,
  barcodeHRIFont,
  barcodeHRIPosition,
  barcodePrint,
  barcodeWidth,
  cashdraw,
  characterCodeTable,
  cut,
  image,
  initialize,
  internationalCharacterSet,
  invert,
  qrcodeCellSize,
  qrcodeCorrectionLevel,
  qrcodeModel,
  qrcodePrint,
  qrcodeStore,
  starQRCodeCellSize,
  starQRCodeCorrectionLevel,
  starQRCodeModel,
  starQRCodePrint,
  starQRCodeStore,
  textBold,
  textFont,
  textMode,
  textSize,
  textUnderline,
] as const;

export type DeserializedCommand =
  | { name: 'char'; data: number }
  | { name: 'lf' }
  | {
      name: InferCommandName<(typeof commands)[number]>;
      data: number[];
    };
export type DeserializedCommandName = DeserializedCommand['name'];

export function deserialize(data: Uint8Array): DeserializedCommand[] {
  const parsed: DeserializedCommand[] = [];
  let i = 0;
  const dataLength = data.length;
  while (i < dataLength) {
    const command = commands.find(x => {
      const startOffset = i;
      const endOffset = i + x.format.length;
      if (endOffset > dataLength) {
        return false;
      }
      return isCommandMatches(x, data.subarray(startOffset, endOffset));
    });
    if (command != null) {
      const startOffset = i;
      let endOffset = i + command.format.length;
      if (typeof command.dynamic === 'function') {
        endOffset += command.dynamic(data.subarray(startOffset, endOffset));
      }
      parsed.push({
        name: command.name,
        data: [...data.subarray(startOffset, endOffset)],
      });
      i = endOffset;
    } else if (data[i] === LF) {
      parsed.push({ name: 'lf' });
      i += 1;
    } else {
      parsed.push({ name: 'char', data: data[i]! });
      i += 1;
    }
  }
  return parsed;
}

function isCommandMatches(command: Command, data: Uint8Array): boolean {
  for (let i = 0; i < command.format.length; i += 1) {
    const item = command.format[i]!;
    if (item === VAR) {
      continue;
    }
    if (item !== data[i]) {
      return false;
    }
  }
  return true;
}
