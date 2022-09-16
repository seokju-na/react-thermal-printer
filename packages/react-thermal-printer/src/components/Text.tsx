import { Align, TextFont, TextSize, TextUnderline } from '@react-thermal-printer/printer';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { ExtendHTMLProps } from '../types/HTMLProps';
import { Printable } from '../types/Printable';
import { reactNodeToString } from '../utils/reactNodeToString';

type Props = ExtendHTMLProps<
  'div',
  {
    align?: Align;
    bold?: boolean;
    font?: TextFont;
    underline?: TextUnderline;
    invert?: boolean;
    size?: { width: TextSize; height: TextSize };
    /** if true, don't feed line after print text */
    inline?: boolean;
    children?: ReactNode;
  }
>;

export const Text: Printable<Props> = ({
  align,
  bold,
  font,
  underline,
  invert,
  size,
  inline,
  className,
  children,
  ...props
}) => {
  return (
    <div
      data-align={align}
      data-bold={bold}
      data-font={font}
      data-underline={underline}
      data-invert={invert}
      data-size-width={size?.width}
      data-size-height={size?.height}
      data-inline={inline}
      className={classNames('rtp-text', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Text.print = (elem, { printer }) => {
  const { children, align, bold, underline, invert, size, inline = false } = elem.props;
  if (children == null) {
    return;
  }

  if (align != null) {
    printer.setAlign(align);
  }
  if (bold != null) {
    printer.setTextBold(bold);
  }
  if (underline != null) {
    printer.setTextUnderline(underline);
  }
  if (invert != null) {
    printer.invert(true);
  }
  if (size != null) {
    printer.setTextSize(size.width, size.height);
  }

  printer.text(reactNodeToString(children));
  if (!inline) {
    printer.newLine();
  }
};
