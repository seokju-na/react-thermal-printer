import classNames from 'classnames';
import { cloneElement, ComponentProps, ReactElement } from 'react';
import { ExtendHTMLProps } from '../types/HTMLProps';
import { Printable } from '../types/Printable';
import { reactNodeToString } from '../utils/reactNodeToString';
import { resetPrinter } from '../utils/resetPrinter';
import { textLength } from '../utils/textLength';
import { wrapText } from '../utils/wrapText';
import { Text } from './Text';

type Props = ExtendHTMLProps<
  'div',
  {
    left: string | ReactElement<ComponentProps<typeof Text>>;
    right: string | ReactElement<ComponentProps<typeof Text>>;
    /**
     * gap between left and right
     * @default 0
     */
    gap?: number;
    children?: never;
  }
>;

export const Row: Printable<Props> = ({ left, right, gap, className, ...props }) => {
  const leftEl = typeof left === 'string' ? <Text>{left}</Text> : left;
  const rightEl = typeof right === 'string' ? <Text>{right}</Text> : right;

  return (
    <div data-gap={gap} className={classNames('rtp-row', className)} {...props}>
      {cloneElement(leftEl, { className: classNames('rtp-row-left', leftEl.props.className) })}
      {cloneElement(rightEl, { className: classNames('rtp-row-right', rightEl.props.className) })}
    </div>
  );
};

Row.print = (elem, { printer, width }) => {
  const { left, right, gap = 0 } = elem.props;
  const leftElem = typeof left === 'string' ? <Text>{left}</Text> : left;
  const rightElem = typeof right === 'string' ? <Text>{right}</Text> : right;

  const leftString = reactNodeToString(leftElem.props.children);
  const leftSize = leftElem.props.size?.width;
  const leftLength = textLength(leftString, { size: leftSize });

  const rightString = reactNodeToString(rightElem.props.children);
  const rightSize = rightElem.props.size?.width;
  const rightLength = textLength(rightString, { size: rightSize });

  const leftLines = wrapText(leftString, {
    size: leftSize,
    width: Math.min(width - gap - rightLength, leftLength),
  });
  const rightLines = wrapText(rightString, {
    size: rightSize,
    width: rightLength,
  });

  for (let i = 0; i < Math.max(leftLines.length, rightLines.length); i++) {
    const leftLine = leftLines[i];
    const rightLine = rightLines[i];

    if (leftLine != null) {
      Text.print(lineText(leftElem, leftLine.text), { printer, width });
      resetPrinter(printer);
    }

    const spaceLength = width - (leftLine?.length ?? 0) - (rightLine?.length ?? 0);
    printer.text(' '.repeat(spaceLength));

    if (rightLine != null) {
      Text.print(lineText(rightElem, rightLine.text), { printer, width });
      resetPrinter(printer);
    }
    printer.newLine();
  }
};

function lineText(textElem: ReactElement<ComponentProps<typeof Text>>, text: string) {
  return cloneElement(textElem, {
    align: 'left', // align cannot be affect inside the <Row />
    inline: true,
    children: text,
  });
}
