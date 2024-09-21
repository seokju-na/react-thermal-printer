import { getPrinter } from '@react-thermal-printer/printer';
import { Children, type ComponentProps, type ReactElement, type ReactNode, isValidElement } from 'react';
import type { Printer } from './components/Printer';
import { isPrintable } from './types/Printable';
import type { PrinterContext } from './types/PrinterContext';
import { resetPrinter } from './utils/resetPrinter';

type PrinterProps = ComponentProps<typeof Printer>;

/**
 * Render the React element as printable binary data.
 */
export async function render(elem: ReactElement<PrinterProps>): Promise<Uint8Array> {
  const { type, characterSet, width = 48, encoder, initialize = true, debug = false, children } = elem.props;
  const printer = getPrinter({ type, characterSet, encoder });

  if (characterSet != null) {
    printer.setCharacterSet(characterSet);
  }
  await print(children, { printer, width });

  if (initialize) {
    printer.initialize();
  }

  if (debug) {
    printer.debug();
  }

  return printer.getData();
}

async function print(node: ReactNode, context: PrinterContext) {
  for (const child of Children.toArray(node)) {
    if (!isValidElement(child)) {
      continue;
    }

    if (isPrintable(child.type)) {
      await child.type.print(child, context);
      resetPrinter(context.printer);
    } else {
      await print(child.props.children, context);
    }
  }
}
