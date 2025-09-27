---
sourcePath: "packages/react-thermal-printer/src/components/Cut.tsx"
---

# Cut

 
Cut the paper.

Perform full/partial cutting, and feeds lines after cutting.

```tsx
<Cut />
<Cut lineFeeds={6} />
// partial cut
<Cut partial={true} />
```

## Signature

```typescript
function Cut(props: CutProps): JSX.Element;
```
