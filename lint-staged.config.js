const path = require('path');

const micormatch = require('micromatch');


const currentWorkingDir = process.cwd();

const nextJsLintArgs = '--fix --file';
const getFileList = (filenames, isNextLint) => filenames
  .map((f) => path.relative(currentWorkingDir, f))
  .join(isNextLint ? ` ${nextJsLintArgs} ` : ' ');

const nextJsLintCommand = (filenames) => (
  `next lint . ${nextJsLintArgs} ${getFileList(filenames, true)}`
);

const eslintCommand = (filenames) => (
  `eslint --cache --fix ${getFileList(filenames)}`
);
const tsJsLintCommand = (filenames) => {
  const dotnetProjects = {
    'src': micormatch(filenames, ['src/**']),
    '*': micormatch(filenames, ['!src/**']),
  };

  return Object.entries(dotnetProjects).reduce((acc, [projectName, fileMatches]) => {
    const eslintCmd = 'src' === projectName ? nextJsLintCommand : eslintCommand;

    if (fileMatches.length) {
      acc.push(`${eslintCmd(fileMatches)}`);
    }

    return acc;
  }, []);
};
const stylelintCommand = 'stylelint --allow-empty-input --fix';

module.exports = {
  '*.{js,jsx}': [tsJsLintCommand],
  '*.{ts,tsx}': [tsJsLintCommand],
  '*.{css,scss}': [stylelintCommand],
  '*.{json,yml}': [eslintCommand],
};
