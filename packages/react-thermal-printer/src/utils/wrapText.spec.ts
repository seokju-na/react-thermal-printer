import { wrapText } from './wrapText';

it('wrap text to multiple lines', () => {
  const text =
    '안녕하세요' + // 10
    '반갑습니다' + // 10
    '자나깨나 불조심'; // 15

  expect(wrapText(text, { width: 8 })).toEqual([
    {
      length: 8,
      text: '안녕하세',
    },
    {
      length: 8,
      text: '요반갑습',
    },
    {
      length: 8,
      text: '니다자나',
    },
    {
      length: 7,
      text: '깨나 불',
    },
    {
      length: 4,
      text: '조심',
    },
  ]);
});
