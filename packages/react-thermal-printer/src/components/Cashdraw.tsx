import type { CashDrawerPin } from '@react-thermal-printer/printer';
import type { Printable } from '../types/Printable.js';

interface Props {
  /** pin to generate pulse */
  pin: CashDrawerPin;
}

export const Cashdraw: Printable<Props> = () => {
  return null;
};

Cashdraw.print = (elem, { printer }) => {
  const { pin } = elem.props;
  printer.cashdraw(pin);
};
