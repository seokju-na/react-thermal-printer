import type { TextSize, TextWordBreak } from '@react-thermal-printer/printer';
import { textLength } from './textLength';

/** wrap text to multiple lines */
export function wrapText(
  text: string,
  options: {
    size?: TextSize;
    width: number;
    wordBreak?: TextWordBreak;
  }
): string[] {
  const { size, width, wordBreak } = options;

  // Choose function based on word break mode
  return wordBreak === 'break-word' ? processBreakWordMode(text, size, width) : processBreakAllMode(text, size, width);
}

function processBreakWordMode(text: string, size: TextSize | undefined, width: number): string[] {
  const lines: string[] = [];
  let line = '';

  const words = text.split(' ');

  for (const word of words) {
    if (word === '') continue;

    const testLine = line ? `${line} ${word}` : word;
    const lengthOfLine = textLength(testLine, { size });

    if (lengthOfLine <= width) {
      line = testLine;
    } else {
      if (line) {
        lines.push(adjustLine(line, size, width));
        line = '';
      }

      // Cut big words into small parts
      let charGroup = '';
      for (const char of word) {
        charGroup += char;
        const charGroupLength = textLength(charGroup, { size });

        if (charGroupLength > width) {
          const partToAdd = charGroup.slice(0, -1);
          lines.push(adjustLine(partToAdd, size, width));
          charGroup = charGroup.slice(-1);
        }
      }

      line = charGroup;
    }
  }

  if (line) {
    lines.push(adjustLine(line, size, width));
  }

  return lines;
}

function processBreakAllMode(text: string, size: TextSize | undefined, width: number): string[] {
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
  const safeCount = Math.max(spaceCount, 0);
  return `${line}${' '.repeat(safeCount)}`;
}

function calcSpaceCount(line: string, size: TextSize | undefined, length: number) {
  let count = 0;
  while (true) {
    const lineWithSpace = `${line}${' '.repeat(count)}`;
    const lineLength = textLength(lineWithSpace, { size });
    if (lineLength >= length) {
      return lineLength === length ? count : count - 1;
    }
    count += 1;
  }
}
