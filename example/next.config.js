const { spawnSync } = require('child_process');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');

function getBabelLoaderTargetLocations(currentServiceLocation) {
  const { stdout } = spawnSync('yarn', ['workspaces', 'list', '--json'], {
    cwd: ROOT_PATH,
    encoding: 'utf8',
  });

  /**
   * @type {{ location: string, name: string }[]}
   */
  const workspaces = stdout
    .split('\n')
    .filter(val => val !== '')
    .map(val => JSON.parse(val));

  return (
    workspaces
      // 루트 워크스페이스는 제외합니다.
      .filter(workspace => workspace.location !== '.')
      // 현재 서비스 프로젝트는 제외합니다.
      .filter(workspace => workspace.location !== currentServiceLocation)
      .map(workspace => workspace.location)
  );
}

const currentServiceDir = process.cwd();
const currentServiceLocation = path.relative(ROOT_PATH, currentServiceDir);
const babelLoaderTargetLocations = getBabelLoaderTargetLocations(currentServiceLocation);

module.exports = {
  webpack: config => {
    config.module.rules.unshift({
      test: /\.tsx?$/,
      include: filePath => {
        return babelLoaderTargetLocations.some(x => filePath.includes(x));
      },
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          rootMode: 'upward',
        },
      },
    });
    return config;
  },
};
