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
  const { type, content, align, ...options } = elem.props;

  if (align != null) {
    printer.setAlign(align);
  }
  printer.barcode(content, type, options);
};
