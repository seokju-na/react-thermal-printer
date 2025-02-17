'use client';

import { useState } from 'react';
import { Cut, Printer, Row, render } from 'react-thermal-printer';
import { hex } from '../../utils';

export default function IndexPage() {
  const [result, setResult] = useState('');
  const handleClick = async () => {
    const buf = await render(
      <Printer type="epson" width={44}>
        <Row left="Hello" right="World" />
        <Cut />
      </Printer>
    );
    setResult(hex(buf));
  };

  return (
    <main>
      <button id="print" type="button" onClick={handleClick}>
        Print
      </button>
      <div id="result">{result}</div>
    </main>
  );
}
