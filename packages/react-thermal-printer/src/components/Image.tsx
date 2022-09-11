import { Align } from '@react-thermal-printer/printer';
import classNames from 'classnames';
import { ReactElement } from 'react';
import { ExtendHTMLProps } from '../types/HTMLProps';
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

export const Image: Printable<Props> = ({ align, src, reader: _, className, ...props }: Props) => {
  return (
    <img
      data-align={align}
      data-src={src}
      src={src}
      className={classNames('rtp-image', className)}
      {...props}
    />
  );
};

Image.print = async (elem, { printer }) => {
  const { align, reader = ({ props: { src } }) => readImageData(src) } = elem.props;
  const { data, width, height } = await reader(elem);

  if (align != null) {
    printer.setAlign(align);
  }
  printer.image(data, width, height);
};
