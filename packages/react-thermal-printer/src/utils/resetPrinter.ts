import { Printer } from '@react-thermal-printer/printer';

export function resetPrinter(printer: Printer) {
  printer.setTextNormal().setAlign('left').invert(false);
}
