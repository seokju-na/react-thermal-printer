import type { ExtendHTMLProps } from '../types/HTMLProps.js';
import type { Printable } from '../types/Printable.js';
import { classNames } from '../utils/classnames.js';

type Props = ExtendHTMLProps<'br'>;

export const Br: Printable = ({ className, ...props }: Props) => {
  return <br className={classNames('rtp-br', className)} {...props} />;
};

Br.print = (_, { printer }) => {
  printer.newLine();
};
