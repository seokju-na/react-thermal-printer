import { expect, test } from '@playwright/test';

test('render printer element', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button').click();
  const result = await page.locator('id=result').innerText();
  expect(result).toContain(
    '1b610048656c6c6f202020202020202020202020202020202020202020202020202020202020202020201b21001d21001b61001d42001b6100576f726c641b21001d21001b61001d42000a1b21001d21001b61001d42000a0a0a0a0a0a1d56301b21001d21001b61001d42001b40'
  );
});
