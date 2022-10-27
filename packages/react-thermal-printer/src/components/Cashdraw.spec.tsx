import { getPrinter } from '@react-thermal-printer/printer';
import { Cashdraw } from './Cashdraw';

it('kick cash drawer', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Cashdraw.print(<Cashdraw pin="2pin" />, { printer: actual, width: 44 });
  expect(actual.getData()).toEqual(expected.cashdraw('2pin').getData());
});
