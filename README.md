# react-thermal-printer

[![npm version](https://badge.fury.io/js/react-thermal-printer.svg)](https://www.npmjs.com/package/react-thermal-printer)

React for thermal printing. It is used to print to a thermal printer that supports [ESC/POS commands](https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=2) using React. It provides a custom renderer to convert React elements to Uint8Array, you can easily markup the printing stuffs using React components.

## Installation

### yarn
```shell
yarn add react-thermal-printer
```

### pnpm
```shell
pnpm add react-thermal-printer
```

### npm
```shell
npm install --save react-thermal-printer
```

## Usage
```tsx
import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';

const receipt = (
  <Printer type="epson" width={42} characterSet="korea">
    <Text size={{ width: 2, height: 2 }}>9,500원</Text>
    <Text bold={true}>결제 완료</Text>
    <Br />
    <Line />
    <Row left="결제방법" right="체크카드" />
    <Row left="카드번호" right="123456**********" />
    <Row left="할부기간" right="일시불" />
    <Row left="결제금액" right="9,500" />
    <Row left="부가세액" right="863" />
    <Row left="공급가액" right="8,637" />
    <Line />
    <Row left="맛있는 옥수수수염차 X 2" right="11,000" />
    <Text>옵션1(500)/옵션2/메모</Text>
    <Row left="(-) 할인" right="- 500" />
    <Br />
    <Line />
    <Row left="합계" right="9,500" />
    <Row left="(-) 할인 2%" right="- 1,000" />
    <Line />
    <Row left="대표" right="김대표" />
    <Row left="사업자등록번호" right="000-00-00000" />
    <Row left="대표번호" right="0000-0000" />
    <Row left="주소" right="어디시 어디구 어디동 몇동몇호" />
    <Line />
    <Br />
    <Text align="center">Wifi: some-wifi / PW: 123123</Text>
    <Cut />
  </Printer>
);
const data: Uint8Array = await render(receipt);
```

<img alt="receipt" width="360" src="https://user-images.githubusercontent.com/13250888/190206825-e54d2d4f-c4e7-45e0-ba8f-eff5cd2b06ff.png">

## API

- [Components](#components)
  - [`<Printer>`](#printer)
  - [`<Text>`](#text)
  - [`<Br>`](#br)
- [Functions](#functions)
  - [render](#render)

## Components
### `<Printer>`
.

### `<Text>`
.

### `<Br>`
Feed line.

```tsx
<Br />
```

## Functions
### `render`
Returns: `Promise<Uint8Array>`

Render element to `Uint8Array` data which corresponding to the esc/pos command.

```tsx
import { render, Printer, Text } from 'react-thermal-printer';

const data = await render(
  <Printer type="epson">
    <Text>Hello World</Text>
  </Printer>
);

const port = await window.navigator.serial.requestPort();
await port.open({ baudRate: 9600 });

const writer = port.writable?.getWriter();
if (writer != null) {
  await writer.write(data);
  writer.releaseLock();
}
```

## License
MIT License
