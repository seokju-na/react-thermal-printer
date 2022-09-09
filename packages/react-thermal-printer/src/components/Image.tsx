import { Align } from '@react-thermal-printer/printer';
import { ReactElement } from 'react';
import { ExtendHTMLProps } from '../types/ExtendHTMLProps';
import { Printable } from '../types/Printable';
import { ImageData, readImageData } from '../utils/readImageData';

type Props = ExtendHTMLProps<
  'img',
  {
    align?: Align;
    src: string;
    /**
     * Image data reader
     * @default read data from <img /> and <canvas />
     */
    reader?: (elem: ReactElement<Props>) => Promise<ImageData>;
  }
>;

export const Image: Printable<Props> = ({ reader: _, ...props }: Props) => {
  return <img {...props} />;
};

Image.print = async (elem, { printer }) => {
  const { align, reader = ({ props: { src } }) => readImageData(src) } = elem.props;
  const { data, width, height } = await reader(elem);

  if (align != null) {
    printer.setAlign(align);
  }
  printer.image(data, width, height);
};
