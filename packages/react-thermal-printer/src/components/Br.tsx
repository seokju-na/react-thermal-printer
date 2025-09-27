import type { ExtendHTMLProps } from '../types/HTMLProps.js';
import type { Printable } from '../types/Printable.js';
import { classNames } from '../utils/classnames.js';

export type BrProps = ExtendHTMLProps<'br'>;

/**
 * @public
 * @name Br
 * @category components
 * @signature
 * ```tsx
 * function Br(props: BrProps): JSX.Element;
 * ```
 *
 * @description
 * Feed line.
 *
 * ```tsx
 * <Br />
 * ```
 */
export const Br: Printable = ({ className, ...props }: BrProps) => {
  return <br className={classNames('rtp-br', className)} {...props} />;
};

Br.print = (_, { printer }) => {
  printer.newLine();
};
