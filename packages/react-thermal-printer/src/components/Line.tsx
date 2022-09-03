import { Printable } from '../types/Printable';

interface Props {
  /**
   * Character to draw line
   * @default '-'
   */
  character?: string;
}

export const Line: Printable<Props> = () => {
  return <hr />;
};

Line.print = (elem, { printer, width }) => {
  const { character = '-' } = elem.props;
  for (let i = 0; i < width; i++) {
    printer.text(character);
  }
  printer.newLine();
};
