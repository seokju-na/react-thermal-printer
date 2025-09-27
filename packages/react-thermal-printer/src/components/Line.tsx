import type { ExtendHTMLProps } from '../types/HTMLProps.js';
import type { Printable } from '../types/Printable.js';
import { classNames } from '../utils/classnames.js';

export type LineProps = ExtendHTMLProps<
  'hr',
  {
    /**
     * Character to draw line
     * @default '-'
     */
    character?: string;
  }
>;

/**
 * @public
 * @name Line
 * @category components
 * @signature
 * ```tsx
 * function Line(props: LineProps): JSX.Element;
 * ```
 *
 * @description
 * Draw line. Prints the character as much as the `width` which from `<Printer>`.
 *
 * ```tsx
 * <Line />
 * <Line character="=" />
 * ```
 */
export const Line: Printable<LineProps> = ({ character, className, ...props }: LineProps) => {
  return <hr data-character={character} className={classNames('rtp-line', className)} {...props} />;
};

Line.print = (elem, { printer, width }) => {
  const { character = '-' } = elem.props;
  for (let i = 0; i < width; i++) {
    printer.text(character);
  }
  printer.newLine();
};
