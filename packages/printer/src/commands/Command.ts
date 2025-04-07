/** Indicates dynamic variable */
export const VAR = Symbol('var');

export type CommandFormatItem = typeof VAR | number;
export type CommandFormat = ReadonlyArray<CommandFormatItem>;

export type CommandWrite<Args extends any[] = any> = (...args: Args) => number[];

export interface Command<Name extends string = string, Write extends CommandWrite = CommandWrite> {
  /** Command name */
  readonly name: Name;
  /** Format of command. */
  readonly format: CommandFormat;
  /** Calculate length of this command when the command has dynamic length. */
  readonly dynamic?: (data: Uint8Array) => number;
  readonly write: Write;
}

export type InferCommandName<T> = T extends Command<infer Name> ? Name : never;

export function createCommand<Name extends string, Write extends CommandWrite>(
  name: Name,
  params: {
    format: ReadonlyArray<CommandFormatItem>;
    write: Write;
    dynamic?: (data: Uint8Array) => number;
  }
): Command<Name, Write> {
  const { format, write, dynamic } = params;
  return {
    name,
    format,
    dynamic,
    write,
  };
}
