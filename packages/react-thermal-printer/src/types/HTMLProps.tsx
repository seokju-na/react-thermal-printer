export type JSXElement = keyof JSX.IntrinsicElements;
export type JSXElementProps<E extends JSXElement> = JSX.IntrinsicElements[E];

export type ExtendHTMLProps<As extends JSXElement, Props = {}> = Props & Omit<JSXElementProps<As>, keyof Props>;
