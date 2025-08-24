import { wrapText } from './wrapText.js';

it('wrap text to multiple lines', () => {
  const text =
    '안녕하세요' + // 10
    '반갑습니다' + // 10
    '자나깨나 불조심'; // 15

  expect(wrapText(text, { width: 8 })).toEqual(['안녕하세', '요반갑습', '니다자나', '깨나 불 ', '조심    ']);
});

it('fix invalid count value error for wrong input', () => {
  const text = 'test';

  expect(wrapText(text, { width: -1 })).toEqual(['', 't', 'e', 's', 't']);
});

it('wraps text with break-word strategy', () => {
  const text = '안녕하세요 반갑습니다 자나깨나 불조심 꺼진불도 다시보자';

  expect(wrapText(text, { width: 8, wordBreak: 'break-word' })).toEqual([
    '안녕하세',
    '요      ',
    '반갑습니',
    '다      ',
    '자나깨나',
    '불조심  ',
    '꺼진불도',
    '다시보자',
  ]);
});
