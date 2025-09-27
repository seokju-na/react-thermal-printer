import type { CashDrawerPin } from '@react-thermal-printer/printer';
import type { Printable } from '../types/Printable.js';

export interface CashdrawProps {
  /** pin to generate pulse */
  pin: CashDrawerPin;
}

/**
 * @public
 * @name Cashdraw
 * @category components
 * @signature
 * ```tsx
 * function Cashdraw(props: CashdrawProps): JSX.Element;
 * ```
 *
 * @description
 * Open cash drawer.
 *
 * ```tsx
 * <Cashdraw pin="2pin" />
 * <Cashdraw pin="5pin" />
 * ```
 */
export const Cashdraw: Printable<CashdrawProps> = () => {
  return null;
};

Cashdraw.print = (elem, { printer }) => {
  const { pin } = elem.props;
  printer.cashdraw(pin);
};
