import { useState } from 'react';
import { Cut, Printer, render, Raw, Br, Text } from 'react-thermal-printer';

// const image = [0x1d, 0x28, 0x4c, 0, 0, 48, 112, 48, 1, 1, 49, 8, 0, 4, 0, 0x80, 0x00, 0x00, 0x00];
const w = 8;
const h = 64;
const image = [
  0x1d, 0x76, 0x30, 0, w, 0, h, 0,
...Array(w * h).fill(0xff),
];

export function IndexPage() {
  const [port, setPort] = useState<SerialPort>();

  async function print() {
    let _port = port;

    if (_port == null) {
      _port = await navigator.serial.requestPort();
      await _port.open({ baudRate: 9600 });
      setPort(_port);
    }

    const writer = _port.writable?.getWriter();
    if (writer != null) {
      const data = await render(
        <Printer type="epson" characterSet="korea" width={42}>
          <Raw data={[0x1b, 0x61, 1]} />
          <Raw data={image} />
          <Br />
          <Text align="left">Hello World</Text>
          <Cut />
        </Printer>,
        { debug: true }
      );

      await writer.write(data);
      writer.releaseLock();
    }
  }

  return (
    <main>
      <button onClick={print}>print</button>
    </main>
  );
}
