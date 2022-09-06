import { getPrinter } from '@react-thermal-printer/printer';
import { render as renderToDOM, screen } from '@testing-library/react';
import { render } from '../render';
import { Printer } from './Printer';
import { Text } from './Text';

it('render children in DOM', () => {
  renderToDOM(<Text>abc</Text>);
  expect(screen.queryByText('abc')).not.toBeNull();
});

it('print text', async () => {
  const actual = await render(
    <Printer type="epson" initialize={false}>
      <Text>i love pizza</Text>
    </Printer>
  );
  const expected = getPrinter({ type: 'epson' })
    .text('i love pizza')
    .newLine()
    .setTextNormal()
    .invert(false)
    .setAlign('left')
    .getData();

  expect(actual).toEqual(expected);
});

it('print text with configs', async () => {
  const actual = await render(
    <Printer type="epson" characterSet="korea" initialize={false}>
      <Text align="center" bold={true} underline="2dot_thick" size={{ width: 3, height: 3 }}>
        안녕하세요
      </Text>
    </Printer>
  );
  const expected = getPrinter({ type: 'epson' })
    .setCharacterSet('korea')
    .setAlign('center')
    .setTextBold(true)
    .setTextUnderline('2dot_thick')
    .setTextSize(3, 3)
    .text('안녕하세요')
    .newLine()
    .setTextNormal()
    .invert(false)
    .setAlign('left')
    .getData();

  expect(actual).toEqual(expected);
});

it('print text with fragments', async () => {
  const actual = await render(
    <Printer type="epson" initialize={false}>
      <Text>
        hello <>world</>
      </Text>
    </Printer>
  );
  const expected = getPrinter({ type: 'epson' })
    .text('hello world')
    .newLine()
    .setTextNormal()
    .invert(false)
    .setAlign('left')
    .getData();

  expect(actual).toEqual(expected);
});

it('print text with html special characters', async () => {
  const actual = await render(
    <Printer type="epson" initialize={false}>
      <Text>
        {`'`}
        {`"`}
        {`<`}
        {`>`}
      </Text>
    </Printer>
  );
  const expected = getPrinter({ type: 'epson' })
    .text(`'"<>`)
    .newLine()
    .setTextNormal()
    .invert(false)
    .setAlign('left')
    .getData();

  expect(actual).toEqual(expected);
});
