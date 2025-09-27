import type { PrinterOptions } from '@react-thermal-printer/printer';
import type { ReactNode } from 'react';
import type { ExtendHTMLProps } from '../types/HTMLProps.js';
import { classNames } from '../utils/classnames.js';

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

/**
 * @public
 * @name Printer
 * @category components
 * @signature
 * ```tsx
 * function Printer(props: PrinterProps): JSX.Element;
 * ```
 *
 * @description
 * Interface of thermal printer.
 *
 * Requires `type` to determine a printer type.
 *
 * Currently, supports `epson` and `start` printers.
 *
 * ```tsx
 * <Printer type="epson">...</Printer>
 * <Printer type="epson" width={42}>...</Printer>
 * <Printer type="epson" characterSet="korea">...</Printer>
 * ```
 *
 * ### With custom encoder
 * Pass `encoder` prop to use custom encoder.
 *
 * ```tsx
 * // utf8 encoding
 * const encoder = text => new TextEncoder().encode(text);
 * const receipt = (
 *   <Printer type="epson" encoder={encoder}>
 *     ...
 *   </Printer>
 * );
 * ```
 */
export function PrinterComp({
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
