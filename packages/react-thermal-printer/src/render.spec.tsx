import { Component } from 'react';
import { Br } from './components/Br';
import { Cut } from './components/Cut';
import { Line } from './components/Line';
import { Printer } from './components/Printer';
import { Row } from './components/Row';
import { Text } from './components/Text';
import { render } from './render';

it('render react node as printable data', async () => {
  const data = await render(
    <Printer type="epson" width={48}>
      <Text>Hello World</Text>
      <Line />
      <Br />
      <Row left="foo" right="bar" />
      <Br />
      <Text>Charge price: $9.99</Text>
      <Br />
      <Cut partial={true} />
    </Printer>
  );
  expect(data).toEqual(
    new Uint8Array([
      72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 10, 27, 33, 0, 29, 33, 0, 27, 97, 0, 29, 66, 0, 45, 45, 45,
      45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
      45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 10, 27, 33, 0, 29, 33, 0, 27, 97, 0, 29, 66,
      0, 10, 27, 33, 0, 29, 33, 0, 27, 97, 0, 29, 66, 0, 27, 97, 0, 102, 111, 111, 32, 32, 32, 32, 32, 32, 32, 32, 32,
      32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
      32, 32, 32, 32, 32, 27, 33, 0, 29, 33, 0, 27, 97, 0, 29, 66, 0, 27, 97, 0, 98, 97, 114, 27, 33, 0, 29, 33, 0, 27,
      97, 0, 29, 66, 0, 10, 27, 33, 0, 29, 33, 0, 27, 97, 0, 29, 66, 0, 10, 27, 33, 0, 29, 33, 0, 27, 97, 0, 29, 66, 0,
      67, 104, 97, 114, 103, 101, 32, 112, 114, 105, 99, 101, 58, 32, 36, 57, 46, 57, 57, 10, 27, 33, 0, 29, 33, 0, 27,
      97, 0, 29, 66, 0, 10, 27, 33, 0, 29, 33, 0, 27, 97, 0, 29, 66, 0, 10, 10, 10, 10, 10, 10, 29, 86, 49, 27, 33, 0,
      29, 33, 0, 27, 97, 0, 29, 66, 0, 27, 64,
    ])
  );
});

it('can render with custom components', async () => {
  function CustomText(props: { children: string }) {
    return <Text>Title: {props.children}</Text>;
  }

  function CustomRow() {
    return (
      <>
        <Text>Subtitle: Hi</Text>
        <Row left="foo" right="bar" />
      </>
    );
  }

  const actual = await render(
    <Printer type="epson">
      <CustomText>Hello World</CustomText>
      <CustomRow />
    </Printer>
  );
  const expected = await render(
    <Printer type="epson">
      <Text>Title: Hello World</Text>
      <Text>Subtitle: Hi</Text>
      <Row left="foo" right="bar" />
    </Printer>
  );
  expect(actual).toEqual(expected);
});

it('can render with class components', async () => {
  class CustomText extends Component<{ children: string }> {
    render() {
      return <Text>Title: {this.props.children}</Text>;
    }
  }

  const actual = await render(
    <Printer type="epson">
      <CustomText>Hello World</CustomText>
    </Printer>
  );
  const expected = await render(
    <Printer type="epson">
      <Text>Title: Hello World</Text>
    </Printer>
  );
  expect(actual).toEqual(expected);
});
