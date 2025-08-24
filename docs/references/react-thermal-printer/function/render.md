---
sourcePath: "packages/react-thermal-printer/src/render.ts"
---

# render

 
Render the React element as printable binary data.


## Signature

```typescript
function render(elem: ReactElement<PrinterProps>, options?: RenderOptions): Promise<Uint8Array>;
```

### Parameters

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">elem</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type">ReactElement&lt;PrinterProps&gt;</span>
    <br/>
    <p class="post-parameters--description">The React element to render.</p>
  </li>
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">options</span> · <span class="post-parameters--type">RenderOptions</span>
    <br/>
    <p class="post-parameters--description">Optional rendering options.</p>
  </li>
</ul>

### Returns

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--type">Promise&lt;Uint8Array&gt;</span>
    <br/>
    <p class="post-parameters--description">The printable binary data.</p>
  </li>
</ul>
