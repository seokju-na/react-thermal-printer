import { getPrinter } from '@react-thermal-printer/printer';
import { render } from '@testing-library/react';
import { Line } from './Line';

it('render <hr /> in DOM', () => {
  const { container } = render(<Line />);
  expect(container.querySelector('hr')).not.toBeNull();
});

it('has ".rtp-line" css class', () => {
  const { container } = render(<Line />);
  expect(container.querySelector('.rtp-line')).not.toBeNull();
});

it('print line', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Line.print(<Line />, { printer: actual, width: 5 });

  expect(actual.getData()).toEqual(expected.text('-----').newLine().getData());
});

it('print line with custom character', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Line.print(<Line character="=" />, { printer: actual, width: 5 });

  expect(actual.getData()).toEqual(expected.text('=====').newLine().getData());
});
