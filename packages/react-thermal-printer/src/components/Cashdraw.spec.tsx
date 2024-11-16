import { getPrinter } from '@react-thermal-printer/printer';
import { resetPrinter } from '../utils/resetPrinter';
import { Cashdraw } from './Cashdraw';

it('kick cash drawer', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Cashdraw.print(<Cashdraw pin="2pin" />, { printer: actual, width: 44, reset: () => resetPrinter(actual) });
  expect(actual.getData()).toEqual(expected.cashdraw('2pin').getData());
});
