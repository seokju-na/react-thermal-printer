import type { Align, QRCodeOptions } from '@react-thermal-printer/printer';
import type { Printable } from '../types/Printable.js';

export interface QRCodeProps extends QRCodeOptions {
  align?: Align;
  content: string;
}

/**
 * @public
 * @name QRCode
 * @category components
 * @signature
 * ```tsx
 * function QRCode(props: QRCodeProps): JSX.Element;
 * ```
 *
 * @description
 * Print qr code (2d barcode).
 *
 * ```tsx
 * <QRCode content="https://github.com/seokju-na/react-thermal-printer" />
 * <QRCode align="center" content="https://github.com/seokju-na/react-thermal-printer" />
 * ```
 */
export const QRCode: Printable<QRCodeProps> = () => {
  // TODO: render qr code in DOM
  return null;
};

QRCode.print = (elem, { printer }) => {
  const { content, align = 'left', ...options } = elem.props;

  if (align != null) {
    printer.setAlign(align);
  }
  printer.qrcode(content, options);
};
