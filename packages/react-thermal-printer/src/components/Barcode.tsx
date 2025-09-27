import type { Align, BarcodeOptions, BarcodeType } from '@react-thermal-printer/printer';
import type { Printable } from '../types/Printable.js';

export interface BarcodeProps extends BarcodeOptions {
  type: BarcodeType;
  align?: Align;
  content: string;
}

/**
 * @public
 * @name Barcode
 * @category components
 * @signature
 * ```tsx
 * function Barcode(props: BarcodeProps): JSX.Element;
 * ```
 *
 * @description
 * Print barcode.
 *
 * ```tsx
 * <Barcode type="UPC-A" content="111111111111" />
 * <Barcode type="CODE39" content="A000$" />
 * <Barcode align="center" type="UPC-A" content="111111111111" />
 * ```
 */
export const Barcode: Printable<BarcodeProps> = () => {
  // TODO: render barcode in DOM
  return null;
};

Barcode.print = (elem, { printer }) => {
  const { type, content, align, ...options } = elem.props;

  if (align != null) {
    printer.setAlign(align);
  }
  printer.barcode(content, type, options);
};
