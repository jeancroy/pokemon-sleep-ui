const path = require('path');

const micromatch = require('micromatch');


/**
 * @type {string} The stylelint command.
 */
const currentWorkingDir = process.cwd();

/**
 * @type {string} The `next lint` common args.
 */
const nextJsLintArgs = '--fix --file';

/**
 * Helper function to concatenate the files needed for commit linting.
 *
 * @param {string[]} filenames The file path names.
 * @param {boolean} isNextLint Whether or not this is for NextJs Lint.
 *
 * @return {string} The command partial for files to lint.
 */
const getFileList = (filenames, isNextLint) => filenames
  .map((f) => path.relative(currentWorkingDir, f))
  .join(isNextLint ? ` ${nextJsLintArgs} ` : ' ');

/**
 * Helper function to generate the `next lint` command.
 *
 * @param {string[]} filenames The file path names.
 *
 * @return {string} The NextJs lint command.
 */
const nextJsLintCommand = (filenames) => (
  `next lint . ${nextJsLintArgs} ${getFileList(filenames, true)}`
);

/**
 * Helper function to generate the `eslint` command for non-next linting.
 *
 * @param {string[]} filenames The file path names.
 *
 * @return {string} The eslint lint command.
 */
const eslintCommand = (filenames) => (
  `eslint --cache --fix ${getFileList(filenames)}`
);

/**
 * Helper function to generate the lint commands for JS, TS, JSON and YML files.
 *
 * @param {string[]} filenames The file path names.
 *
 * @return {string[]} The lint commands for the nextjs and non-nextjs files.
 */
const tsJsLintCommand = (filenames) => {
  const dotnetProjects = {
    'src': micromatch(filenames, ['src/**']),
    '*': micromatch(filenames, ['!src/**']),
  };

  return Object.entries(dotnetProjects).reduce((acc, [projectName, fileMatches]) => {
    const eslintCmd = 'src' === projectName ? nextJsLintCommand : eslintCommand;

    if (fileMatches.length) {
      acc.push(`${eslintCmd(fileMatches)}`);
    }

    return acc;
  }, []);
};

/**
 * @type {string} The stylelint command.
 */
const stylelintCommand = 'stylelint --allow-empty-input --fix';

/**
 * Color mixer.
 * @module lint-staged/config
 */
module.exports = {
  '*.{js,jsx}': [tsJsLintCommand],
  '*.{ts,tsx}': [tsJsLintCommand],
  '*.{css,scss}': [stylelintCommand],
  '*.{json,yml}': [eslintCommand],
};
