import type { Align, TextFont, TextSize, TextUnderline } from '@react-thermal-printer/printer';
import type { ReactNode } from 'react';
import type { ExtendHTMLProps } from '../types/HTMLProps.js';
import type { Printable } from '../types/Printable.js';
import { classNames } from '../utils/classnames.js';
import { reactNodeToString } from '../utils/reactNodeToString.js';

export type TextProps = ExtendHTMLProps<
  'div',
  {
    align?: Align;
    bold?: boolean;
    font?: TextFont;
    underline?: TextUnderline;
    invert?: boolean;
    size?: { width: TextSize; height: TextSize };
    wordBreak?: 'break-all' | 'break-word';
    /** if true, don't feed line after print text */
    inline?: boolean;
    children?: ReactNode;
  }
>;

/**
 * @public
 * @name Text
 * @category components
 * @signature
 * ```tsx
 * function Text(props: TextProps): JSX.Element;
 * ```
 *
 * @description
 * Display text, and change text size or style to make it bold, underline, etc.
 *
 * `<Text>` component also allows `<div>` element props.
 *
 * **Note**: `<Text>` allows only string nodes.
 *
 * ```tsx
 * <Text>text</Text>
 * <Text>fragment is {'allowed'}</Text>
 * <Text align="center">center text</Text>
 * <Text align="right">right text</Text>
 * <Text bold={true}>bold text</Text>
 * <Text underline="1dot-thick">underline text</Text>
 * <Text invert={true}>invert text</Text>
 * <Text size={{ width: 2, height: 2 }}>big size text</Text>
 * ```
 */
export const Text: Printable<TextProps> = ({
  align,
  bold,
  font,
  underline,
  invert,
  size,
  inline,
  wordBreak,
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
      data-word-break={wordBreak}
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
