import { PrinterOptions } from '@react-thermal-printer/printer';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { ExtendHTMLProps } from '../types/HTMLProps';

interface PrinterProps extends PrinterOptions {
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
  /** log esc/pos commands before render. */
  debug?: boolean;
  children: ReactNode;
}

export function Printer({
  type,
  width,
  characterSet,
  initialize,
  debug,
  children,
  className,
  ...props
}: ExtendHTMLProps<'div', PrinterProps>) {
  return (
    <div
      data-printer-type={type}
      data-character-set={characterSet}
      data-initialize={initialize}
      data-width={width}
      data-debug={debug}
      className={classNames('rtp-printer', className)}
      {...props}
    >
      {children}
    </div>
  );
}
