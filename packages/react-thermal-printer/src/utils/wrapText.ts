import { TextSize } from '@react-thermal-printer/printer';
import { textLength } from './textLength';

interface Line {
  text: string;
  length: number;
}

/** wrap text to multiple lines */
export function wrapText(
  text: string,
  options: {
    size?: TextSize;
    width: number;
  }
): Line[] {
  const { size, width } = options;
  const result: Line[] = [];
  const chars = text.split('');
  let line = '';

  chars.forEach((char, i) => {
    line = `${line}${char}`;
    const lengthOfLine = textLength(line, { size });
    if (lengthOfLine > width) {
      line = line.slice(0, line.length - 1);
      result.push({
        text: line,
        length: textLength(line, { size }),
      });
      line = char;
    }

    const isLast = i === chars.length - 1;
    if (isLast && line.length > 0) {
      result.push({
        text: line,
        length: textLength(line, { size }),
      });
    }
  });
  return result;
}
