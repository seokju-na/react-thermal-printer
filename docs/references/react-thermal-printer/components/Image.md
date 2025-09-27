---
sourcePath: "packages/react-thermal-printer/src/components/Image.tsx"
---

# Image

 
Print image bitmap.

```tsx
<Image src="https://my-cdn.com/image.png" />
<Image align="center" src="https://my-cdn.com/image.png" />
<Image src="https://my-cdn.com/image.png" reader={myCustomImageReader} />

// A custom reader for reading image binary data.
function myCustomImageReader(
  elem: ReactElement<ComponentProps<typeof Image>>
): Promise<Image>;
```

By passing transform functions, image can be converted.

The example below applies the [Floyd-Steinberg dithering](https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering) algorithm:
```tsx
import { transforms } from '@react-thermal-printer/image';

<Image src="https://my-cdn.com/image.png" transforms={[transforms.floydSteinberg]} />
```

## Signature

```typescript
function Image(props: ImageProps): JSX.Element;
```
