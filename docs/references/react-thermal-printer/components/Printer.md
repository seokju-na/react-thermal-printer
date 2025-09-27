---
sourcePath: "packages/react-thermal-printer/src/components/Printer.tsx"
---

# Printer

 
Interface of thermal printer.

Requires `type` to determine a printer type.

Currently, supports `epson` and `start` printers.

```tsx
<Printer type="epson">...</Printer>
<Printer type="epson" width={42}>...</Printer>
<Printer type="epson" characterSet="korea">...</Printer>
```

### With custom encoder
Pass `encoder` prop to use custom encoder.

```tsx
// utf8 encoding
const encoder = text => new TextEncoder().encode(text);
const receipt = (
  <Printer type="epson" encoder={encoder}>
    ...
  </Printer>
);
```

## Signature

```typescript
function Printer(props: PrinterProps): JSX.Element;
```
