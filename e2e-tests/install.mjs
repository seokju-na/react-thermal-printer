import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

await fs.rm(path.join(rootDir, 'e2e-tests', 'packages'), { recursive: true, force: true });
await fs.mkdir(path.join(rootDir, 'e2e-tests', 'packages'), { recursive: true });

async function run(command, args, options) {
  return new Promise((resolve, reject) => {
    const ps = spawn(command, args, {
      ...options,
      stdio: 'inherit',
    });
    ps.on('close', () => resolve());
    ps.on('error', e => reject(e));
  });
}

const packages = await fs.readdir(path.join(rootDir, 'packages'));
for (const pkg of packages) {
  const pkgPath = path.join(rootDir, 'packages', pkg);
  console.log(`[${pkg}] yarn pack`);
  await run('yarn', ['pack'], { cwd: pkgPath });
  console.log(`[${pkg}] copy package tgz`);
  await fs.copyFile(path.join(pkgPath, 'package.tgz'), path.join(rootDir, 'e2e-tests', 'packages', `${pkg}.tgz`));
}

await fs.rm(path.join(rootDir, 'e2e-tests', 'yarn.lock'), { force: true });
await fs.writeFile(path.join(rootDir, 'e2e-tests', 'yarn.lock'), '');
await run('yarn', ['install', '--refresh-lockfile'], {
  cwd: path.join(rootDir, 'e2e-tests'),
});
