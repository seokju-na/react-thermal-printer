import { CashDrawerPin } from '@react-thermal-printer/printer/src/Printer';
import { Printable } from '../types/Printable';

interface Props {
  /** pin to generate pulse */
  pin: CashDrawerPin;
}

export const Cashdraw: Printable<Props> = () => {
  return <></>;
};

Cashdraw.print = (elem, { printer }) => {
  const { pin } = elem.props;
  printer.cashdraw(pin);
};
