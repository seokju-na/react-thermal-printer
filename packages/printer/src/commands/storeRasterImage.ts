import { GS } from './common';

export function storeRasterImage() {
  return [GS, 0x28, 0x4c, 0, 0, 48, 112, 48, 1, 1, 49, 4, 0, 4, 0];
}
