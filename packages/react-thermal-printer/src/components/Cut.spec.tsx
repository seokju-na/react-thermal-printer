import { getPrinter } from '@react-thermal-printer/printer';
import { resetPrinter } from '../utils/resetPrinter.js';
import { Cut } from './Cut.js';

it('feed lines and cut', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Cut.print(<Cut lineFeeds={3} />, { printer: actual, width: 44, reset: () => resetPrinter(actual) });
  expect(actual.getData()).toEqual(expected.newLine().newLine().newLine().cut().getData());
});

it('feed lines, feed paper to cutter and cut', () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Cut.print(<Cut partial lineFeeds={2} feedToCutter />, {
    printer: actual,
    width: 44,
    reset: () => resetPrinter(actual),
  });
  expect(actual.getData()).toEqual(expected.newLine().newLine().cut(true, true).getData());
});

it('feed paper to cutter without line feeds', () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Cut.print(<Cut lineFeeds={0} feedToCutter />, {
    printer: actual,
    width: 44,
    reset: () => resetPrinter(actual),
  });
  expect(actual.getData()).toEqual(expected.cut(false, true).getData());
});
