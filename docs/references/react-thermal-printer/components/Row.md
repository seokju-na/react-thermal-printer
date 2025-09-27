---
sourcePath: "packages/react-thermal-printer/src/components/Row.tsx"
---

# Row

 
Display `<Text>` on the left, center and right sides.

```tsx
<Row left="left" right="right" />
<Row left="left" right="right" gap={2} />
<Row left="left" center="center" right="right" />
<Row
  left={<Text>left</Text>}
  right="right"
/>
<Row
  left={<Text>left</Text>}
  right="very very long text will be multi line placed."
/>
```

## Signature

```typescript
function Row(props: RowProps): JSX.Element;
```
