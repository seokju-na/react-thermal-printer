import type { Printable } from '../types/Printable.js';

export interface RawProps {
  data: Uint8Array | number[];
}

/**
 * @public
 * @name Raw
 * @category components
 * @signature
 * ```tsx
 * function Raw(props: RawProps): JSX.Element;
 * ```
 *
 * @description
 * Print raw data.
 *
 * ```tsx
 * <Raw data={Uint8Array.from([0x00, 0x01, ...])} />
 * ```
 */
export const Raw: Printable<RawProps> = () => {
  return null;
};

Raw.print = (elem, { printer }) => {
  const { data } = elem.props;
  printer.raw(data instanceof Uint8Array ? data : new Uint8Array(data));
};
