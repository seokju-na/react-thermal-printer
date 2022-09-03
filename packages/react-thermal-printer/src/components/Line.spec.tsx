import { getPrinter } from '@react-thermal-printer/printer';
import { render as renderToDOM } from '@testing-library/react';
import { render } from '../render';
import { Line } from './Line';
import { Printer } from './Printer';

it('render <hr /> in DOM', () => {
  const { container } = renderToDOM(<Line />);
  expect(container.querySelector('hr')).not.toBeNull();
});

it('print line', async () => {
  const actual = await render(
    <Printer type="epson" width={5} initialize={false}>
      <Line />
    </Printer>
  );
  const expected = getPrinter({ type: 'epson' }).text('-----').newLine().getData();

  expect(actual).toEqual(expected);
});

it('print line with custom character', async () => {
  const actual = await render(
    <Printer type="epson" width={5} initialize={false}>
      <Line character="=" />
    </Printer>
  );
  const expected = getPrinter({ type: 'epson' }).text('=====').newLine().getData();

  expect(actual).toEqual(expected);
});
