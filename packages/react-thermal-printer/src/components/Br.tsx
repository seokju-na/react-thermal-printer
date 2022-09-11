import classNames from 'classnames';
import { ExtendHTMLProps } from '../types/HTMLProps';
import { Printable } from '../types/Printable';

type Props = ExtendHTMLProps<'br'>;

export const Br: Printable = ({ className, ...props }: Props) => {
  return <br className={classNames('rtp-br', className)} {...props} />;
};

Br.print = (_, { printer }) => {
  printer.newLine();
};
