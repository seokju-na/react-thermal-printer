import { getPrinter, type Printer as PrinterType } from '@react-thermal-printer/printer';
import {
  Children,
  type ComponentClass,
  type ComponentProps,
  type FunctionComponent,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { Printer } from './components/Printer.js';
import { isPrintable } from './types/Printable.js';
import type { PrinterContext } from './types/PrinterContext.js';
import { resetPrinter } from './utils/resetPrinter.js';

type PrinterProps = ComponentProps<typeof Printer>;

export interface RenderOptions {
  resetPrinter?: (printer: PrinterType) => void;
}

/**
 * @public
 * @kind function
 * @name render
 * @signature
 * ```typescript
 * function render(elem: ReactElement<PrinterProps>, options?: RenderOptions): Promise<Uint8Array>;
 * ```
 *
 * @description
 * Render the React element as printable binary data.
 *
 * @param {ReactElement<PrinterProps>} elem - The React element to render.
 * @param {RenderOptions} [options] - Optional rendering options.
 * @returns {Promise<Uint8Array>} The printable binary data.
 */
export async function render(elem: ReactElement<PrinterProps>, options?: RenderOptions): Promise<Uint8Array> {
  const { type, characterSet, width = 48, encoder, initialize = true, debug = false } = elem.props;
  const printer = getPrinter({ type, characterSet, encoder });

  if (characterSet != null) {
    printer.setCharacterSet(characterSet);
  }
  const context: PrinterContext = {
    printer,
    width,
    reset() {
      if (typeof options?.resetPrinter === 'function') {
        return options.resetPrinter(printer);
      }
      return resetPrinter(printer);
    },
  };
  await print(elem, context);

  if (initialize) {
    printer.initialize();
  }

  if (debug) {
    printer.debug();
  }

  return printer.getData();
}

async function print(node: ReactNode, context: PrinterContext) {
  if (!isValidElement(node)) {
    return;
  }
  if (isPrintable(node.type)) {
    await node.type.print(node, context);
    resetPrinter(context.printer);
    return;
  }
  for (const child of renderReactElement(node)) {
    await print(child, context);
  }
}

function renderReactElement(elem: ReactElement<any>) {
  let rendered: any = [];
  if (typeof elem.type === 'function') {
    const isClassComp = !!elem.type.prototype && !!elem.type.prototype.isReactComponent;
    rendered = isClassComp
      ? new (elem.type as ComponentClass)(elem.props).render()
      : (elem.type as FunctionComponent)(elem.props);
  } else if (elem.props.children) {
    rendered = elem.props.children;
  }
  return Children.toArray(rendered);
}
