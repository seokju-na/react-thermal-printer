import { wrapText } from './wrapText';

it('wrap text to multiple lines', () => {
  const text =
    '안녕하세요' + // 10
    '반갑습니다' + // 10
    '자나깨나 불조심'; // 15

  expect(wrapText(text, { width: 8 })).toEqual([
    '안녕하세',
    '요반갑습',
    '니다자나',
    '깨나 불 ',
    '조심    ',
  ]);
});
