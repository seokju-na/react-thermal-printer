import { Printable } from '../types/Printable';

interface Props {
  data: Uint8Array | number[];
}

export const Raw: Printable<Props> = () => {
  return <></>;
};

Raw.print = (elem, { printer }) => {
  const { data } = elem.props;
  printer.raw(data instanceof Uint8Array ? data : new Uint8Array(data));
};
