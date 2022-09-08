import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { Cut, Printer, render, Br, Text, Image } from 'react-thermal-printer';

// const image = [0x1d, 0x28, 0x4c, 0, 0, 48, 112, 48, 1, 1, 49, 8, 0, 4, 0, 0x80, 0x00, 0x00, 0x00];
const w = 8;
const h = 64;
const image = [0x1d, 0x76, 0x30, 0, w, 0, h, 0, ...Array(w * h).fill(0xff)];

export function IndexPage() {
  const [port, setPort] = useState<SerialPort>();
  const { mutateAsync: print, isLoading: isPrinting } = useMutation(async () => {
    let _port = port;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');

    if (video == null || canvas == null) {
      return;
    }

    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (_port == null) {
      _port = await navigator.serial.requestPort();
      await _port.open({ baudRate: 9600 });
      setPort(_port);
    }

    const writer = _port.writable?.getWriter();
    if (writer != null) {
      const img = await readCanvasBlob(canvas, 'image/png');
      const imgUrl = URL.createObjectURL(img);

      const data = await render(
        <Printer type="epson" characterSet="korea" width={42}>
          <Text align="center">Hello World</Text>
          <Br />
          <Image align="center" src={imgUrl} />
          <Br />
          <Text align="center">@ JSConf Korea 2022</Text>
          <Text align="center">Have Fun!</Text>
          <Cut />
        </Printer>,
        { debug: true }
      );

      await writer.write(data);
      writer.releaseLock();
      URL.revokeObjectURL(imgUrl);
    }
  });

  const { data: stream } = useQuery(
    ['user-media-stream'],
    () => navigator.mediaDevices.getUserMedia({ audio: false, video: true }),
    {
      onSuccess: stream => {
        if (videoRef.current != null) {
          videoRef.current.srcObject = stream;
          videoRef.current.width = 360;
          videoRef.current.height = 360;
        }
      },
    }
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <main>
      <div>
        <video ref={videoRef} playsInline={true} autoPlay={true} style={{ objectFit: 'cover' }} />
      </div>
      <div style={{ marginTop: 24 }}>
        <button disabled={stream == null || isPrinting} onClick={() => print()}>
          {isPrinting ? '프린트 중...' : '프린트'}
        </button>
      </div>
    </main>
  );
}

function readCanvasBlob(canvas: HTMLCanvasElement, type?: string, quality?: unknown) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob != null) {
          resolve(blob);
        } else {
          reject(new Error('cannot get canvas blob'));
        }
      },
      type,
      quality
    );
  });
}
