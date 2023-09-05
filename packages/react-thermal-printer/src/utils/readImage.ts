import type { Image } from '@react-thermal-printer/image';

export function readImage(src: string) {
  return new Promise<Image>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = '';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext('2d');
      if (context == null) {
        reject(new Error('cannot get context'));
        return;
      }

      context.drawImage(img, 0, 0);
      const { data } = context.getImageData(0, 0, img.width, img.height);
      resolve({
        data: new Uint8Array(data),
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = err => reject(err);
    img.src = src;
  });
}
