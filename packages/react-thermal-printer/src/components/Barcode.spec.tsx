import { getPrinter } from '@react-thermal-printer/printer';
import { Barcode } from './Barcode';

it('print barcode', () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Barcode.print(
    <Barcode
      type="CODE39"
      content="1234567890"
      align="center"
      hriPosition="top-bottom"
      hriFont="B"
      width={4}
      height={170}
    />,
    { printer: actual, width: 44 }
  );
  expect(actual.getData()).toEqual(
    expected
      .setAlign('center')
      .barcode('1234567890', 'CODE39', {
        hriPosition: 'top-bottom',
        hriFont: 'B',
        width: 4,
        height: 170,
      })
      .getData()
  );
});
