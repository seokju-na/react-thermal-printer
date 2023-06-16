import { Printer } from '@react-thermal-printer/printer';

export function resetPrinter(printer: Printer) {
  printer.setTextNormal().setTextSize(1, 1).setAlign('left').invert(false);
}
