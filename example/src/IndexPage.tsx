import { useState } from 'react';
import { Cut, Line, Printer, render, Text } from 'react-thermal-printer';

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
          <Text>안녕하세요</Text>
          <Line />
          <Text align="right">방가방가</Text>
          <Text align="center" bold={true}>
            맥미니 좋음
          </Text>
          <Text size={{ width: 2, height: 2 }}>Avicii 영원해라</Text>
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
