import classNames from 'classnames';
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

export const Line: Printable<Props> = ({ character, className, ...props }: Props) => {
  return <hr data-character={character} className={classNames('rtp-line', className)} {...props} />;
};

Line.print = (elem, { printer, width }) => {
  const { character = '-' } = elem.props;
  for (let i = 0; i < width; i++) {
    printer.text(character);
  }
  printer.newLine();
};
