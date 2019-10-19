/**
 * Color Organizer Advanced (summary)
 * See branch: feature/tests (detailed)
 */

// Overview

/**
 * One benefit of practicing functional techniques is that 
 * they lend themselves to writing testable code. 
 * Pure functions are naturally testable. 
 * Immutability is easily testable.
 * Composing applications out of small functions designed for 
 * specific tasks produces testable functions or units of code.
 * 
 * We see techniques that can be used to unit test React Redux applications. 
 * This chapter will not only cover testing, 
 * but also tools that can be used to help evaluate and 
 * improve your code and your tests.
 */

// Linting/Hinting

/**
 * The process of analyzing JavaScript code is called hinting or linting. 
 * JSHint and JSLint are the original tools used to analyze JavaScript and 
 * provide feedback about formatting.
 * ESLint is the latest code linter that supports emerging JavaScript syntax.
 * Also ESLint is pluggable. 
 * This means that we can create and share plugins that 
 * can be added to ESLint configurations to extend its capabilities.
 */

// Using `eslint-plugin-react`

/**
 * We will be working with a plugin called eslint-plugin-react. 
 * This plugin will analyze our JSX and React syntax in addition to our JavaScript.
 * 
 * We can install eslint globally, with npm:
 * $ npm install -g eslint or yarn global add eslint
 * 
 * Before we use ESLint, 
 * we need to define some configuration rules that we can agree to follow. 
 * We’ll define these in a configuration file that is located in our project root.
 * This file can be formatted as JSON or YAML. 
 * YAML is a data serialization formation like JSON but with less syntax, 
 * making it a little easier for humans to read.
 * 
 * ESLint comes with a tool that helps us set up configuration. 
 * There are several companies that have created ESLint config files that 
 * we can use as a starting point, or we can create our own.
 */

// We can create an ESLint configuration by running eslint --init and 
// then answer some questions about our coding style:

// $ eslint --init
// ? How would you like to configure ESLint?

// Answer questions about your style
// ? How would you like to use ESLint? To check syntax and find problems
// ? What type of modules does your project use? JavaScript modules (import/export)
// ? Which framework does your project use? React
// ? Does your project use TypeScript? No
// ? Where does your code run? Browser
// ? What format do you want your config file to be in? YAML
// Local ESLint installation not found.
// The config that you've selected requires the following dependencies:
// eslint-plugin-react@latest eslint@latest
// ? Would you like to install them now with npm? No

// I instead usedd `yarn` to install these dependencies:
// yarn add eslint@latest, eslint-plugin-react@latest --dev

// After eslint --init runs, three things happen:
// 1. ESLint and eslint-plugin-react are installed locally 
//    to the ./node_modules folder.
// 2. These dependencies are automatically added to the package.json file.
// 3. A configuration file, .eslintrc.yml, is created and 
//    added to the root of our project.


// Let’s test our ESLint configuration out by creating a sample.js file:

const gnar = "gnarly"

const info = ({ file = __filename, dir = __dirname }) =>
  <p>{dir}: {file}</p>

switch (gnar) {
  default:
    console.log('gnarley')
    break
}

// This file has some issues, but nothing that would cause errors in the browser. 
// Technically, this code works just fine. 

// Let’s run ESLint on this very file,
// and see what feedback we get based upon our customized rules:

// C:\virtualenvs\react\fast-react\color-organizer-test.js
//   88:7   error  'info' is assigned a value but never used  no-unused-vars
//   88:24  error  '__filename' is not defined                no-undef
//   88:42  error  '__dirname' is not defined                 no-undef
//   93:5   error  'console' is not defined                   no-undef

// ✖ 4 problems (4 errors, 0 warnings)

// ESLint has analyzed our sample and is reporting some issues based upon our configuration choices. 
// We see here that ESLint complains about the info function being defined but never used; 
// ESLint hates that. 
// ESLint also complains about __filename and __dirname because 
// it does not automatically include Node.js globals.
// And finally, ESLint does not like the use of a console statement.

// We can modify our ESLint configuration, .eslintrc.yml, to make it less strict:

  env:
    browser: true
    commonjs: true
    es6: true
  extends: 'eslint:recommended'
  globals:
    Atomics: readonly
    SharedArrayBuffer: readonly
    __filename: true
    __dirname: true
  parserOptions:
    ecmaFeatures:
      experimentalObjectRestSpread: true
      jsx: true
    ecmaVersion: 2018
    sourceType: module
  plugins:
    - react
  rules:
    indent: 
      - error
      - 2
      - SwitchCase: 1
    quotes: 
      - error
      - single
    semi: 
      - error
      - never
    linebreak-style: 
      - error
      - unix
    no-console: 0

// Upon opening .eslintrc.yml, 
// you’ll first notice that the file is readable and approachable — that is the goal of YAML. 
// Here, we’ve modified the indentation rules to allow for the indentation of switch statements. 
// Next we’ve added a no-console rule, which will prevent ESLint from complaining about the console.log statement. 
// Finally, we’ve added a couple of global variables for ESLint to ignore.

// We’ll still need to make a couple of changes to our file in order to follow our style guide:
// Updated...

const gnar = 'gnarly'

export const info = ({ file = __filename, dir = __dirname }) =>
  <p>{dir}: {file}</p>

switch (gnar) {
  default:
    console.log('gnarley')
    break
}

// We’ve removed the semicolon and double quotes from line 1. 
// Also, exporting the info function means ESLint will no longer complain about it being unused. 
// Between modifying the ESLint configuration and making some changes to our code, 
// we have a file that passes the code-formatting test.


// Linting the project

/**
 * The command eslint . will lint your entire directory. 
 * In order to do this, you will most likely require that ESLint ignore some JavaScript files. 
 */

// The .eslintignore file is where you can add files or directories for ESLint to ignore:
//    /node_modules/
//    **/assets/
//    color-orgnaizer-test.js

/** 
 * This .eslintignore file tells ESLint to ignore our file `color-organizer-test.js` file, 
 * as well as anything in `/assets` and `node_modules` folders.
 * If we do not ignore the assets folder, ESLint will analyze the client bundle.js file and 
 * it will find a lot to complain about in that file.
 */

/**
 * Let’s add a script to our package.json file for running lint:
 *    "scripts": {
 *      "lint": "./node_modules/.bin/eslint ."
 *    }
 */ 

// Now ESLint can be run any time we want with npm run lint, 
// and it will analyze all of the files in our project except the ones we have ignored.
// NOTE: Adding the `--fix` causes the linter to correct all the fixable errors.

// C:\virtualenvs\react\fast-react>yarn lint --fix
// yarn run v1.19.1
// warning You don't appear to have an internet connection. 
// Try the --offline flag to use the cache for registry queries.

// $ ./node_modules/.bin/eslint . --fix
// Done in 6.15s.


// Testing Redux

