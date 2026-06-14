// Documentation-only prop types consumed by `<AutoTypeTable>` (see components/mdx.tsx).
//
// Several component prop types in react-thermal-printer use `ExtendHTMLProps<element, {...}>`,
// which intersects the component's own props with *all* HTML attributes of the underlying
// element. Pointing AutoTypeTable directly at those types would render a huge table full of
// HTML attributes (className, onClick, aria-*, ...). To keep the generated tables focused on
// the meaningful props, we `Pick` only the own props here. Types that are already free of HTML
// props are re-exported as-is.
//
// Keep these in sync with the component sources in
// packages/react-thermal-printer/src/components/*.tsx.

import type { Image, ImageToRasterOptions, ImageTransform } from '@react-thermal-printer/image';
import type { ComponentProps, ReactElement } from 'react';
// Imported as a value purely so `typeof Printer` resolves below. This file is never bundled
// into the app — it is only read by the AutoTypeTable generator (ts-morph) at build time.
import type {
  Align,
  BarcodeProps as BarcodeFullProps,
  CashdrawProps as CashdrawFullProps,
  CutProps as CutFullProps,
  LineProps as LineFullProps,
  Printer,
  QRCodeProps as QRCodeFullProps,
  RawProps as RawFullProps,
  RenderOptions as RenderFullOptions,
  RowProps as RowFullProps,
  TextProps as TextFullProps,
} from 'react-thermal-printer';

// --- HTML-extended components: pick only the own props ---

export type PrinterProps = Pick<
  ComponentProps<typeof Printer>,
  'type' | 'characterSet' | 'encoder' | 'width' | 'initialize' | 'debug' | 'children'
>;

export type TextProps = Pick<
  TextFullProps,
  'align' | 'bold' | 'font' | 'underline' | 'invert' | 'size' | 'wordBreak' | 'inline' | 'children'
>;

export type LineProps = Pick<LineFullProps, 'character'>;

export type RowProps = Pick<RowFullProps, 'left' | 'center' | 'right' | 'gap'>;

// `ImageProps` is hand-declared rather than `Pick`ed: the source type is self-referential
// (`reader` takes a `ReactElement<ImageProps>`), which makes any type derived from it circular
// and impossible for the generator to resolve. We mirror the own props here and break the
// recursion in `reader`'s parameter.
export interface ImageProps {
  align?: Align;
  src: string;
  /**
   * Image transformer.
   * @example
   * // Greyscale dithering with floyd-steinberg algorithm.
   * import { transforms } from '@react-thermal-printer/image';
   *
   * <Image transforms={[transforms.floydSteinberg]} {...} />
   */
  transforms?: ImageTransform[];
  rgbToBlack?: ImageToRasterOptions['rgbToBlack'];
  /**
   * Image data reader
   * @default read data from <img /> and <canvas />
   */
  reader?: (elem: ReactElement) => Promise<Image>;
}

// --- Already free of HTML props: re-export as-is ---

export type BarcodeProps = BarcodeFullProps;
export type CashdrawProps = CashdrawFullProps;
export type CutProps = CutFullProps;
export type QRCodeProps = QRCodeFullProps;
export type RawProps = RawFullProps;
export type RenderOptions = RenderFullOptions;
