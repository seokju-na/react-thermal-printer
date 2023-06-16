import { TextSize } from '@react-thermal-printer/printer';
import { textLength } from './textLength';

/** wrap text to multiple lines */
export function wrapText(
  text: string,
  options: {
    size?: TextSize;
    width: number;
  }
): string[] {
  const { size, width } = options;
  const lines: string[] = [];
  const chars = text.split('');
  let line = '';

  chars.forEach((char, i) => {
    line = `${line}${char}`;
    const lengthOfLine = textLength(line, { size });
    if (lengthOfLine > width) {
      line = line.slice(0, line.length - 1);
      lines.push(adjustLine(line, size, width));
      line = char;
    }

    const isLast = i === chars.length - 1;
    if (isLast && line.length > 0) {
      lines.push(adjustLine(line, size, width));
    }
  });
  return lines;
}

function adjustLine(line: string, size: TextSize | undefined, length: number) {
  const spaceCount = calcSpaceCount(line, size, length);
  return `${line}${' '.repeat(spaceCount)}`;
}

function calcSpaceCount(line: string, size: TextSize | undefined, length: number) {
  let count = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    line = `${line}${' '.repeat(count)}`;
    const lineLength = textLength(line, { size });
    if (lineLength >= length) {
      return lineLength === length ? count : count - 1;
    }
    count += 1;
  }
}
