export function classNames(...classNames: Array<string | null | undefined>): string {
  return classNames.filter(x => x != null).join(' ');
}
