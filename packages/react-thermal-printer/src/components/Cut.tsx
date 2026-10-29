import type { Printable } from '../types/Printable.js';

export interface CutProps {
  /**
   * cut after line feeds
   * @default 6
   */
  lineFeeds?: number;
  /**
   * partial cut
   * @default false
   */
  partial?: boolean;
  /**
   * feed paper to the cutter before cutting, in addition to lineFeeds
   * @default false
   */
  feedToCutter?: boolean;
}

/**
 * @public
 * @name Cut
 * @category components
 * @signature
 * ```tsx
 * function Cut(props: CutProps): JSX.Element;
 * ```
 *
 * @description
 * Cut the paper.
 *
 * Perform full/partial cutting after feeding the specified number of lines.
 *
 * Set `feedToCutter` to advance paper to the cutter before cutting. It defaults to `false` and does not replace `lineFeeds`.
 *
 * ```tsx
 * <Cut />
 * <Cut lineFeeds={6} />
 * // partial cut
 * <Cut partial={true} />
 * // feed paper to the cutter before cutting
 * <Cut partial lineFeeds={2} feedToCutter={true} />
 * ```
 */
export const Cut: Printable<CutProps> = () => {
  return null;
};

Cut.print = (elem, { printer }) => {
  const { lineFeeds = 6, partial = false, feedToCutter = false } = elem.props;
  for (let i = 0; i < lineFeeds; i++) {
    printer.newLine();
  }
  printer.cut(partial, feedToCutter);
};
