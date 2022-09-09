import { Align, BarcodeOptions, BarcodeType } from '@react-thermal-printer/printer';
import { Printable } from '../types/Printable';

interface Props extends BarcodeOptions {
  type: BarcodeType;
  align?: Align;
  content: string;
}

export const Barcode: Printable<Props> = () => {
  // TODO: render barcode in DOM
  return <></>;
};

Barcode.print = (elem, { printer }) => {
  const { type, content, align = 'left', ...options } = elem.props;

  printer.setAlign(align).barcode(content, type, options).setAlign(align); // reset
};
