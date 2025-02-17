import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

await fs.rm(path.join(rootDir, 'e2e-tests', 'packages'), { recursive: true, force: true });
await fs.mkdir(path.join(rootDir, 'e2e-tests', 'packages'), { recursive: true });

const packages = await fs.readdir(path.join(rootDir, 'packages'));
for (const pkg of packages) {
  const pkgPath = path.join(rootDir, 'packages', pkg);
  console.log(`[${pkg}] yarn pack`);
  await execa('yarn', ['pack'], { cwd: pkgPath, stdio: 'inherit' });
  console.log(`[${pkg}] copy package tgz`);
  await fs.copyFile(path.join(pkgPath, 'package.tgz'), path.join(rootDir, 'e2e-tests', 'packages', `${pkg}.tgz`));
}
