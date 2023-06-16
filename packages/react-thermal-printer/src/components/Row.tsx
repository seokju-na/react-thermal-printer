import { Printer } from '@react-thermal-printer/printer';
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
    center?: string | ReactElement<ComponentProps<typeof Text>>;
    right: string | ReactElement<ComponentProps<typeof Text>>;
    /**
     * gap between left and right
     * @default 0
     */
    gap?: number;
    children?: never;
  }
>;

export const Row: Printable<Props> = ({ left, center, right, gap, className, ...props }) => {
  const leftEl = typeof left === 'string' ? <Text>{left}</Text> : left;
  const centerEl = typeof center === 'string' ? <Text>{center}</Text> : center;
  const rightEl = typeof right === 'string' ? <Text>{right}</Text> : right;

  return (
    <div data-gap={gap} className={classNames('rtp-row', className)} {...props}>
      {cloneElement(leftEl, { className: classNames('rtp-row-left', leftEl.props.className) })}
      {centerEl !== undefined
        ? cloneElement(centerEl, {
            className: classNames('rtp-row-center', centerEl.props.className),
          })
        : null}
      {cloneElement(rightEl, { className: classNames('rtp-row-right', rightEl.props.className) })}
    </div>
  );
};

Row.print = (elem, { printer, width }) => {
  const { left, center, right, gap = 0 } = elem.props;
  const leftElem = typeof left === 'string' ? <Text>{left}</Text> : left;
  const centerElem = typeof center === 'string' ? <Text>{center}</Text> : center;
  const rightElem = typeof right === 'string' ? <Text>{right}</Text> : right;

  const leftString = reactNodeToString(leftElem.props.children);
  const leftSize = leftElem.props.size?.width;
  const leftLength = textLength(leftString, { size: leftSize });

  const centerString =
    centerElem !== undefined ? reactNodeToString(centerElem.props.children) : undefined;
  const centerSize = centerElem?.props.size?.width;

  const rightString = reactNodeToString(rightElem.props.children);
  const rightSize = rightElem.props.size?.width;
  const rightLength = textLength(rightString, { size: rightSize });

  const leftLineWidth = centerElem !== undefined ? leftLength : width - gap - rightLength;
  const leftLines = wrapText(leftString, {
    size: leftSize,
    width: leftLineWidth,
  });
  const centerLineWidth = width - gap * 2 - leftLength - rightLength;
  const centerLines =
    centerString !== undefined
      ? wrapText(centerString, { size: centerSize, width: centerLineWidth })
      : undefined;
  const rightLineWidth = rightLength;
  const rightLines = wrapText(rightString, {
    size: rightSize,
    width: rightLineWidth,
  });

  const maxLines = Math.max(leftLines.length, centerLines?.length ?? 0, rightLines.length);
  for (let i = 0; i < maxLines; i++) {
    const leftLine = leftLines[i];
    const centerLine = centerLines?.[i];
    const rightLine = rightLines[i];

    if (leftLine != null) {
      Text.print(lineText(leftElem, leftLine.text), { printer, width });
      resetPrinter(printer);
    } else {
      space(printer, leftLineWidth);
    }

    if (centerElem != null) {
      space(printer, gap);
      if (centerLine != null) {
        Text.print(lineText(leftElem, centerLine.text), { printer, width });
        resetPrinter(printer);
      } else {
        space(printer, centerLineWidth);
      }
    }

    space(printer, gap);
    if (rightLine != null) {
      Text.print(lineText(rightElem, rightLine.text), { printer, width });
      resetPrinter(printer);
    } else {
      space(printer, rightLineWidth);
    }
    printer.newLine();
  }
};

function space(printer: Printer, length: number) {
  printer.text(' '.repeat(length));
}

function lineText(textElem: ReactElement<ComponentProps<typeof Text>>, text: string) {
  return cloneElement(textElem, {
    align: 'left', // align cannot be affect inside the <Row />
    inline: true,
    children: text,
  });
}
