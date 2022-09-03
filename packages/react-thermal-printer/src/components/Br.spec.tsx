import { getPrinter } from '@react-thermal-printer/printer';
import { render as renderToDOM } from '@testing-library/react';
import { render } from '../render';
import { Br } from './Br';
import { Printer } from './Printer';

it('render <br /> in DOM', () => {
  const { container } = renderToDOM(<Br />);
  expect(container.querySelector('br')).not.toBeNull();
});

it('print new line', async () => {
  const actual = await render(
    <Printer type="epson" initialize={false}>
      <Br />
    </Printer>
  );
  const expected = getPrinter({ type: 'epson' }).newLine().getData();

  expect(actual).toEqual(expected);
});
