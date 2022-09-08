import { Align } from '@react-thermal-printer/printer';
import { Printable } from '../types/Printable';
import { readImageData } from '../utils/readImageData';

interface Props {
  align?: Align;
  src: string;
}

export const Image: Printable<Props> = ({ src }: Props) => {
  return <img src={src} />;
};

Image.print = async (elem, { printer }) => {
  const { src, align } = elem.props;
  const { data, width, height } = await readImageData(src);

  if (align != null) {
    printer.setAlign(align);
  }
  printer.image(data, width, height).setAlign('left'); // reset
};
