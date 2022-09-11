import { Align, TextFont, TextSize, TextUnderline } from '@react-thermal-printer/printer';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ExtendHTMLProps } from '../types/HTMLProps';
import { Printable } from '../types/Printable';

type Props = ExtendHTMLProps<
  'div',
  {
    align?: Align;
    bold?: boolean;
    font?: TextFont;
    underline?: TextUnderline;
    invert?: boolean;
    size?: { width: TextSize; height: TextSize };
    children?: ReactNode;
  }
>;

export const Text: Printable<Props> = props => {
  return (
    <div
      data-align={props.align}
      data-bold={props.bold}
      data-font={props.font}
      data-underline={props.underline}
      data-invert={props.invert}
      data-size-width={props.size?.width}
      data-size-height={props.size?.height}
      {...styling(props)}
    >
      {props.children}
    </div>
  );
};

Text.print = (elem, { printer }) => {
  const { children, align, bold, underline, invert, size } = elem.props;
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

  printer.text(childrenToString(children)).newLine();
};

const replaces = [
  { from: /&quot;/g, to: `"` },
  { from: /&amp;/g, to: `&` },
  { from: /&#x27;/g, to: `'` },
  { from: /&lt;/g, to: `<` },
  { from: /&gt;/g, to: `>` },
];

function childrenToString(node: ReactNode) {
  let str = renderToStaticMarkup(<>{node}</>);
  replaces.forEach(({ from, to }) => {
    str = str.replace(from, to);
  });
  return str;
}

function styling(props: Props): Props {
  const { align, bold, font: _, underline, invert: __, style, className, ...otherProps } = props;

  return {
    style: {
      textAlign:
        align === 'left'
          ? 'left'
          : align === 'center'
          ? 'center'
          : align === 'right'
          ? 'right'
          : undefined,
      textDecoration:
        underline === '1dot_thick' || underline === '2dot_thick' ? 'underline' : undefined,
      fontWeight: bold ? 'bold' : undefined,
      ...style,
    },
    className: classNames('rtp-text', className),
    ...otherProps,
  };
}
