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
 * Perform full/partial cutting, and feeds lines after cutting.
 *
 * ```tsx
 * <Cut />
 * <Cut lineFeeds={6} />
 * // partial cut
 * <Cut partial={true} />
 * ```
 */
export const Cut: Printable<CutProps> = () => {
  return null;
};

Cut.print = (elem, { printer }) => {
  const { lineFeeds = 6, partial = false } = elem.props;
  for (let i = 0; i < lineFeeds; i++) {
    printer.newLine();
  }
  printer.cut(partial);
};
