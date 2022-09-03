import { Printable } from '../types/Printable';

interface Props {
  /**
   * cut after line feeds
   * @default 6
   */
  lineFeeds?: number;
}

export const Cut: Printable<Props> = () => {
  return <></>;
};

Cut.print = (elem, { printer }) => {
  const { lineFeeds = 6 } = elem.props;
  for (let i = 0; i < lineFeeds; i++) {
    printer.newLine();
  }
  printer.cut();
};
