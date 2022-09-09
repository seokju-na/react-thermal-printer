import { ExtendHTMLProps } from '../types/ExtendHTMLProps';
import { Printable } from '../types/Printable';

type Props = ExtendHTMLProps<
  'hr',
  {
    /**
     * Character to draw line
     * @default '-'
     */
    character?: string;
  }
>;

export const Line: Printable<Props> = (props: Props) => {
  return <hr {...props} />;
};

Line.print = (elem, { printer, width }) => {
  const { character = '-' } = elem.props;
  for (let i = 0; i < width; i++) {
    printer.text(character);
  }
  printer.newLine();
};
