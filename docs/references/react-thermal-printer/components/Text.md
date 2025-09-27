---
sourcePath: "packages/react-thermal-printer/src/components/Text.tsx"
---

# Text

 
Display text, and change text size or style to make it bold, underline, etc.

`<Text>` component also allows `<div>` element props.

**Note**: `<Text>` allows only string nodes.

```tsx
<Text>text</Text>
<Text>fragment is {'allowed'}</Text>
<Text align="center">center text</Text>
<Text align="right">right text</Text>
<Text bold={true}>bold text</Text>
<Text underline="1dot-thick">underline text</Text>
<Text invert={true}>invert text</Text>
<Text size={{ width: 2, height: 2 }}>big size text</Text>
```

## Signature

```typescript
function Text(props: TextProps): JSX.Element;
```
