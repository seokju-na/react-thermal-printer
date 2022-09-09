import { getPrinter } from '@react-thermal-printer/printer';
import fs from 'node:fs';
import { PNG } from 'pngjs';
import { ImageData } from '../utils/readImageData';
import { Image } from './Image';

function readPNG(filename: string) {
  return new Promise<ImageData>((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(new PNG())
      .on('parsed', function onParsed(data) {
        resolve({
          data,
          width: this.width,
          height: this.height,
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
}

it('print image', async () => {
  const src = 'fixtures/epson-thermal-printer.png';
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  await Image.print(<Image src={src} reader={({ props: { src } }) => readPNG(src)} />, {
    printer: actual,
    width: 44,
  });

  const png = await readPNG(src);
  expect(actual.getData()).toEqual(expected.image(png.data, png.width, png.height).getData());
});
