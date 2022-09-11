import { getPrinter } from '@react-thermal-printer/printer';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

it('render children in DOM', () => {
  render(<Text>abc</Text>);
  expect(screen.queryByText('abc')).not.toBeNull();
});

it('has ".rtp-text" css class', () => {
  const { container } = render(<Text>abc</Text>);
  expect(container.querySelector('.rtp-text')).not.toBeNull();
});

it('data props', () => {
  render(
    <Text
      align="center"
      bold={true}
      font="B"
      underline="2dot-thick"
      invert={true}
      size={{ width: 3, height: 4 }}
    >
      hello
    </Text>
  );
  const text = screen.getByText('hello');
  expect(text).toHaveAttribute('data-align', 'center');
  expect(text).toHaveAttribute('data-bold', 'true');
  expect(text).toHaveAttribute('data-font', 'B');
  expect(text).toHaveAttribute('data-underline', '2dot-thick');
  expect(text).toHaveAttribute('data-invert', 'true');
  expect(text).toHaveAttribute('data-size-width', '3');
  expect(text).toHaveAttribute('data-size-height', '4');
});

it('print text', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Text.print(<Text>i love pizza</Text>, { printer: actual, width: 44 });

  expect(actual.getData()).toEqual(expected.text('i love pizza').newLine().getData());
});

it('print text with configs', async () => {
  const actual = getPrinter({ type: 'epson', characterSet: 'korea' });
  const expected = getPrinter({ type: 'epson', characterSet: 'korea' });

  Text.print(
    <Text
      align="center"
      bold={true}
      invert={true}
      underline="2dot-thick"
      size={{ width: 3, height: 3 }}
    >
      안녕하세요
    </Text>,
    { printer: actual, width: 44 }
  );

  expect(actual.getData()).toEqual(
    expected
      .setAlign('center')
      .setTextBold(true)
      .setTextUnderline('2dot-thick')
      .invert(true)
      .setTextSize(3, 3)
      .text('안녕하세요')
      .newLine()
      .getData()
  );
});

it('print text with fragments', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Text.print(
    <Text>
      hello <>world</>
    </Text>,
    { printer: actual, width: 44 }
  );

  expect(actual.getData()).toEqual(expected.text('hello world').newLine().getData());
});

it('print text with html special characters', async () => {
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  Text.print(
    <Text>
      {`'`}
      {`"`}
      {`<`}
      {`>`}
    </Text>,
    { printer: actual, width: 44 }
  );

  expect(actual.getData()).toEqual(expected.text(`'"<>`).newLine().getData());
});
