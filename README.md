# react-thermal-printer

[![npm version](https://badge.fury.io/js/react-thermal-printer.svg)](https://www.npmjs.com/package/react-thermal-printer)

React for thermal printing. It is used to print to a thermal printer that supports [ESC/POS commands](https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=2) using React. It provides a custom renderer to convert React elements to Uint8Array, you can easily markup the printing stuffs using React components.

## Installation

```shell
yarn add react-thermal-printer
pnpm add react-thermal-printer
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
  - [`<Row>`](#row)
  - [`<Br>`](#br)
  - [`<Line>`](#line)
  - [`<Barcode>`](#barcode)
  - [`<QRCode>`](#qrcode)
  - [`<Image>`](#image)
  - [`<Cut>`](#cut)
  - [`<Raw>`](#raw)
- [Functions](#functions)
  - [render](#render)

## Components
### `<Printer>`
Interface of thermal printer.

Requires `type` to determine printer type.

```tsx
<Printer type="epson">...</Printer>
<Printer type="epson" width={42}>...</Printer>
<Printer type="epson" characterSet="korea">...</Printer>
```

**Note**: Supported printer types are `epson`, `star`.

#### Custom `encoder`

Pass `encoder` prop to use custom encoder.

```tsx
// utf8 encoding
const encoder = text => new TextEncoder().encode(text);
const receipt = (
  <Printer type="epson" encoder={encoder}>
    ...
  </Printer>
);
```


### `<Text>`
Display text, and change text size or style to make it bold, underline, etc.

`<Text>` component also allows `<div>` element props.

```tsx
<Text>text</Text>
<Text>fragment is {'allowed'}</Text>
<Text align="center">center text</Text>
<Text align="right">right text</Text>
<Text bold={true}>bold text</Text>
<Text underline="1dot-thick">underline text</Text>
<Text invert={true}>invert text</Text>
<Text size={{ width: 2, height: 2 }}>big size text</Text> 
```

**Note**: `<Text>` allows only text nodes.

### `<Row>`
Display `<Text>` on the left and right sides.

```tsx
<Row left="left" right="right" />
<Row left="left" right="right" gap={2} />
<Row 
  left={<Text>left</Text>}
  right="right"
/>
<Row
  left={<Text>left</Text>}
  right="very very long text will be multi line placed."
/>
```

### `<Br>`
Feed line.

```tsx
<Br />
```

### `<Line>`
Draw line. Prints the character as much as the `width` which from `<Printer>`. 

```tsx
<Line />
<Line character="=" />
```

### `<Barcode>`
Print barcode.

```tsx
<Barcode type="UPC-A" content="111111111111" />
<Barcode type="CODE39" content="A000$" />
<Barcode align="center" type="UPC-A" content="111111111111" />
```

### `<QRCode>`
Print qr code (2d barcode).

```tsx
<QRCode content="https://github.com/seokju-na/react-thermal-printer" />
<QRCode align="center" content="https://github.com/seokju-na/react-thermal-printer" />
```

### `<Image>`
Print image bitmap.

```tsx
<Image src="https://my-cdn.com/image.png" />
<Image align="center" src="https://my-cdn.com/image.png" />
<Image src="https://my-cdn.com/image.png" reader={myCustomImageReader} />

function myCustomImageReader(
  elem: ReactElement<ComponentProps<typeof Image>>
): Promise<Image>;
```

Apply greyscale([Floyd-Steinberg dithering](https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering)):
```tsx
import { transforms } from '@react-therma-printer/image';

<Image src="https://my-cdn.com/image.png" transforms={[transforms.floydSteinberg]} />
```

### `<Cut>`
Cut the paper.

Perform full/partial cutting, and feeds lines after cutting.

```tsx
<Cut />
<Cut lineFeeds={6} />
// partial cut
<Cut partial={true} />
```

### `<Raw>`
Print raw data.

```tsx
<Raw data={Uint8Array.from([0x00, 0x01, ...])} />
```

### `<Cashdraw>`
Open cash drawer.

```tsx
<Cashdraw pin="2pin" />
<Cashdraw pin="5pin" />
```

## Functions
### `render`
Returns: `Promise<Uint8Array>`

Render element to `Uint8Array` data which corresponding to the esc/pos command.

---

Print via serial port (Web):
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

Print via network (Nodejs):
```tsx
import { render, Printer, Text } from 'react-thermal-printer';
import { connect } from 'node:net';

const data = await render(
  <Printer type="epson">
    <Text>Hello World</Text>
  </Printer>
);

const conn = connect({
  host: '192.168.0.99',
  port: 9100,
  timeout: 3000,
}, () => {
  conn.write(Buffer.from(data), () => {
    conn.destroy();
  });
});
```

## License
MIT License
