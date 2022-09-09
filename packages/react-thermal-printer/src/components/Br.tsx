import { ExtendHTMLProps } from '../types/HTMLProps';
import { Printable } from '../types/Printable';

type Props = ExtendHTMLProps<'br'>;

export const Br: Printable = (props: Props) => {
  return <br {...props} />;
};

Br.print = (_, { printer }) => {
  printer.newLine();
};
