import { getPrinter } from '@react-thermal-printer/printer';
import { render as renderToDOM } from '@testing-library/react';
import { resetPrinter } from '../utils/resetPrinter.js';
import { Br } from './Br.js';

it('render <br /> in DOM', () => {
  const { container } = renderToDOM(<Br />);
  expect(container.querySelector('br')).not.toBeNull();
});

it('has ".rtp-br" css class', () => {
  const { container } = renderToDOM(<Br />);
  expect(container.querySelector('.rtp-br')).not.toBeNull();
});

it('print new line', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Br.print(<Br />, { printer: actual, width: 44, reset: () => resetPrinter(actual) });
  expect(actual.getData()).toEqual(expected.newLine().getData());
});
