import { ExtendHTMLProps } from '../types/HTMLProps';
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

export const Line: Printable<Props> = ({ character, ...props }: Props) => {
  return <hr data-character={character} {...props} />;
};

Line.print = (elem, { printer, width }) => {
  const { character = '-' } = elem.props;
  for (let i = 0; i < width; i++) {
    printer.text(character);
  }
  printer.newLine();
};
