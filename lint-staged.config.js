const path = require('path');


const currentWorkingDir = process.cwd();
const getFileList = (filenames) => filenames
  .map((f) => path.relative(currentWorkingDir, f))
  .join(' --file ');

const nextJsLintCommand = (filenames) => `next lint --fix --file ${getFileList(filenames)}`;
const eslintCommand = 'eslint --config ./.eslintrc.yml --ignore-path ./.eslintignore --fix';
const stylelintCommand = 'stylelint --allow-empty-input --fix';

module.exports = {
  '*.{js,jsx,ts,tsx}': [nextJsLintCommand],
  '*.{css,scss}': [stylelintCommand],
  '*.{json,yml}': [eslintCommand],
};
