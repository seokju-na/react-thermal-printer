const { readdirSync, readFileSync } = require('node:fs');
const path = require('node:path');

function findRootDir() {
  let current = process.cwd();
  while (true) {
    const files = readdirSync(current);
    if (files.some(x => x === 'yarn.lock')) {
      break;
    }
    current = path.resolve(current, '../');
  }
  return current;
}

const rootDir = findRootDir();

function findInternalPackages() {
  return readdirSync(path.join(rootDir, 'packages/')).map(name => {
    const pkgJsonFilePath = path.join(rootDir, 'packages', name, 'package.json');
    const pkgJson = readFileSync(pkgJsonFilePath, 'utf8');
    return JSON.parse(pkgJson).name;
  });
}

/** @type import('next').NextConfig */
module.exports = {
  transpilePackages: [...findInternalPackages()],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
