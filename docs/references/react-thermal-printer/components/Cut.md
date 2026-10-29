---
sourcePath: "packages/react-thermal-printer/src/components/Cut.tsx"
---

# Cut

 
Cut the paper.

Perform full/partial cutting after feeding the specified number of lines.

Set `feedToCutter` to advance paper to the cutter before cutting. It defaults to `false` and does not replace `lineFeeds`.

```tsx
<Cut />
<Cut lineFeeds={6} />
// partial cut
<Cut partial={true} />
// feed paper to the cutter before cutting
<Cut partial lineFeeds={2} feedToCutter={true} />
```

## Signature

```typescript
function Cut(props: CutProps): JSX.Element;
```
