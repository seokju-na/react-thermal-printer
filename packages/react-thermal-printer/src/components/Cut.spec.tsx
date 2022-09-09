import { getPrinter } from '@react-thermal-printer/printer';
import { Cut } from './Cut';

it('feed lines and cut', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Cut.print(<Cut lineFeeds={3} />, { printer: actual, width: 44 });
  expect(actual.getData()).toEqual(expected.newLine().newLine().newLine().cut().getData());
});
