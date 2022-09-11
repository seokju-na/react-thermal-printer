import { TextSize } from '@react-thermal-printer/printer';
import { sum } from './sum';

export function textLength(text: string, { size = 1 }: { size?: TextSize } = {}) {
  return sum(
    text
      .split('')
      .map(charLength)
      .map(x => x * size)
  );
}

function charLength(char: string) {
  const code = char.charCodeAt(0);
  return code > 0x7f && code <= 0xffff ? 2 : 1; // More than 2bytes count as 2
}
