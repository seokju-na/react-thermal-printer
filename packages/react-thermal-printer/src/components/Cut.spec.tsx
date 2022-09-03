import { getPrinter } from '@react-thermal-printer/printer';
import { render } from '../render';
import { Cut } from './Cut';
import { Printer } from './Printer';

it('feed lines and cut', async () => {
  const actual = await render(
    <Printer type="epson" initialize={false}>
      <Cut lineFeeds={3} />
    </Printer>
  );
  const expected = getPrinter({ type: 'epson' }).newLine().newLine().newLine().cut().getData();

  expect(actual).toEqual(expected);
});
