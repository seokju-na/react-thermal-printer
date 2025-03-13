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
      if (textLength(word, { size }) > width) {
        const wordChunks = splitWordEfficiently(word, size, width);

        for (let i = 0; i < wordChunks.length - 1; i++) {
          lines.push(adjustLine(wordChunks[i]!, size, width));
        }
        line = wordChunks[wordChunks.length - 1] || '';
      } else {
        line = word;
      }
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

function splitWordEfficiently(word: string, size: TextSize | undefined, width: number): string[] {
  const chunks: string[] = [];
  let remainingWord = word;

  while (remainingWord.length > 0) {
    if (textLength(remainingWord, { size }) <= width) {
      chunks.push(remainingWord);
      break;
    }

    let low = 1;
    let high = remainingWord.length;
    let bestFit = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const chunk = remainingWord.substring(0, mid);
      const chunkLength = textLength(chunk, { size });

      if (chunkLength <= width) {
        bestFit = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    chunks.push(remainingWord.substring(0, bestFit));
    remainingWord = remainingWord.substring(bestFit);
  }

  return chunks;
}
