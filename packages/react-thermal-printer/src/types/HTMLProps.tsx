export type JSXElement = keyof JSX.IntrinsicElements;
export type JSXElementProps<E extends JSXElement> = JSX.IntrinsicElements[E];

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint,@typescript-eslint/ban-types
export type ExtendHTMLProps<As extends JSXElement, Props extends any = {}> = Props &
  Omit<JSXElementProps<As>, keyof Props>;
