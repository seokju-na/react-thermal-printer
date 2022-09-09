import { PrinterOptions } from '@react-thermal-printer/printer';
import { ReactNode } from 'react';

interface Props extends PrinterOptions {
  /**
   * number of characters in one line
   * @default 48
   */
  width?: number;
  /**
   * whether to put initialize command to last
   * @default true
   */
  initialize?: boolean;
  children: ReactNode;
}

export function Printer({ width, children }: Props) {
  return <div data-width={width}>{children}</div>;
}
