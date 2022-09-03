import { Printable } from '../types/Printable';

export const Br: Printable = () => {
  return <br />;
};

Br.print = (_, { printer }) => {
  printer.newLine();
};
