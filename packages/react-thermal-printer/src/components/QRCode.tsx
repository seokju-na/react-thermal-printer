import { Align, QRCodeOptions } from '@react-thermal-printer/printer';
import { Printable } from '../types/Printable';

interface Props extends QRCodeOptions {
  align?: Align;
  content: string;
}

export const QRCode: Printable<Props> = () => {
  // TODO: render qr code in DOM
  return <></>;
};

QRCode.print = (elem, { printer }) => {
  const { content, align = 'left', ...options } = elem.props;

  if (align != null) {
    printer.setAlign(align);
  }
  printer.qrcode(content, options);
};
