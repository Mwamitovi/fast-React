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

C:\virtualenvs\react\fast-react>eslint --init
? How would you like to configure ESLint?

Answer questions about your style
? How would you like to use ESLint? To check syntax and find problems
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? React
? Does your project use TypeScript? No
? Where does your code run? Browser
? What format do you want your config file to be in? YAML
Local ESLint installation not found.

The config that you've selected requires the following dependencies:
eslint-plugin-react@latest eslint@latest
? Would you like to install them now with npm? No

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

C:\virtualenvs\react\fast-react\color-organizer-test.js
  88:7   error  'info' is assigned a value but never used  no-unused-vars
  88:24  error  '__filename' is not defined                no-undef
  88:42  error  '__dirname' is not defined                 no-undef
  93:5   error  'console' is not defined                   no-undef

✖ 4 problems (4 errors, 0 warnings)

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

C:\virtualenvs\react\fast-react>yarn lint --fix
yarn run v1.19.1
warning You don't appear to have an internet connection. 
Try the --offline flag to use the cache for registry queries.

$ ./node_modules/.bin/eslint . --fix
Done in 6.15s.


// Testing Redux


/**
 * Testing is essential for Redux because it only works with data — it does not have a UI.
 * Redux is naturally testable because its reducers are pure functions, 
 * and it is easy to inject state into a store. 
 * 
 * Writing a reducer test first makes it easy to understand how the reducer is supposed to work. 
 * And writing tests for your store and your action creators will give you confidence that 
 * your client data layer is working as intended.
 * 
 * In this section, we will write some unit tests for the Redux components of the color organizer.
 */

/**
 * Test-Driven Development
 * 
 * Test-driven development, or TDD, is a practice—not a technology. 
 * It does not mean that you simply have tests for your application. 
 * Rather, it is the practice of letting the tests drive the development process. 
 * 
 * In order to practice TDD, you must follow these steps:
 * 
 * Write the tests first:
 *  This is the most critical step. You declare what you are building and how it should work first in a test.
 * 
 * Run the tests and watch them fail (red)
 *  Run your tests and watch them fail before you write the code.
 * 
 * Write the minimal amount of code required to make the tests pass (green)
 *  Now all you have to do is make the tests pass. Focus specifically on making each test pass; 
 *  do not add any functionality beyond the scope of the test.
 * 
 * Refactor both the code and the tests (gold)
 *  Once the tests pass, it is time to take a closer look at your code and your tests. 
 *  Try to express your code as simply and as beautifully as possible.
 *  (For more on this development pattern, see Jeff McWherter and James Bender, “Red, Green, Refactor”.)
 *  https://www.oreilly.com/library/view/professional-test-driven-development/9780470643204/ch004-sec002.html
 * 
 */ 

// TDD is an excellent way to approach a Redux application. 
// It is typically easier to reason about how a reducer should work before actually writing the reducer. 
// Practicing TDD will allow you to build,
// and certify the entire data structure for a feature or application independent of the UI.


// Testing Reducers

/**
 * Reducers are pure functions that calculate and return results based upon the input arguments. 
 * In a test, we get to control the input, the current state, and the action.
 * Given a current state and an action, we should be able to predict a reducer’s output.
 */

// Before we can get started writing tests, we will need to install a testing framework.
// You can write tests for React and Redux with any JavaScript testing framework. 
// We’ll use Jest, a JavaScript testing framework that was designed with React in mind:

// Jest

// > `npm install -g jest`
// This command installs Jest and the Jest CLI globally. 
// You can now run the jest command from any folder to run the tests.
// Since we are using emerging JavaScript and React, 
// we will need to transpile our code and our tests before they can run. 

// Just install the babel-jest package to make that possible:

// > `npm install --save-dev babel-jest`
// With babel-jest installed, all of your code and tests will be transpiled with Babel before the tests run. 
// A .babelrc file is required for this to work, but we should already have one in the root of our project.

// Note: create-react-app
// Projects that were initialized with create-react-app already come with the jest and 
// babel-jest packages installed. They also create a __tests__ directory in the root of the project.

/**
 * Jest has two important functions for setting up tests: describe and it. 
 * `describe` is used to create a suite of tests, 
 * and `it` is used for each test.
 * 
 * Both functions expect the name of the test or suite,
 * and a callback function that contains the test or suite of tests.
 */

// Let’s create a test file and stub our tests. 
// Create a folder called ./__tests__/store/reducers, and in it create a new JavaScript file called color.test.js:

describe("color Reducer", () => {
  it("ADD_COLOR success")
  it("RATE_COLOR success")
})

// In this example, 
// we create a suite of tests for the color reducer by stubbing a test for each action that affects the reducer. 
// Each test is defined with the it function. 
// You can set up a pending test by only sending a single argument to the it function.

// Run this test with the jest command. 
// Jest will run and report that it has failed because it expects at least one test:

C:\virtualenvs\react\fast-react>jest
  FAIL  color-organizer-test/__tests__/__store__/__reducers__/color.test.js
    ● Test suite failed to run

      Your test suite must contain at least one test.
        at ../../../Users/Mwamitovi/AppData/Roaming/npm/node_modules/jest/node_modules/@jest/core/build/TestScheduler.js:242:24

  Test Suites: 1 failed, 1 total
  Tests:       0 total
  Snapshots:   0 total
  Time:        22.255s
  Ran all test suites.


// Test Files
// Jest will run any tests found in the __tests__ directory, 
// and any JavaScript files in your project whose names end with .test.js. 
// Some developers prefer to place their tests directly next to the files they are testing, 
// while others prefer to group their tests in a single folder.

// It is now time to write both of these tests. 

// Since we are testing the color reducer, we will import that function specifically. 
// The color reducer function is referred to as our system under test (SUT). 
// We will import this function, send it an action, and verify the results.
// Jest “matchers” are returned by the expect function and used to verify results. 
// To test the color reducer we will use the .toEqual matcher. 
// This verifies that the resulting object matches the argument sent to .toEqual:

/**
 * To test a reducer, we need a state and a sample action. 
 * 
 * We obtain the result by invoking our SUT, the color function, with these sample objects. 
 * Finally, we check the result to make sure the appropriate state was 
 * returned using the .toEqual matcher.
 * 
 * To test ADD_COLOR, the initial state doesn’t matter much. 
 * However, when we send the color reducer an ADD_COLOR action, 
 * it should return a new color object.
 * 
 * To test RATE_COLOR, we’ll provide an initial color object with 
 * a rating of 0 for the assumed state. Sending this state object along with 
 * a RATE_COLOR action should result in a color object that has our new rating.
 * 
 */

// Now that we have written our tests, 
// if we are pretending that we do not already have the code for the color reducer, 
// we need to stub that function. 

// We can stub the color reducer by 
// adding a function called color to our /src/store/reducers.js file. 
// This will allow our tests to find the empty reducer and import it:

import C from '../constants'

export const color = (state={}, action) => { return state }

// Why Stub the Reducer First?
// Without a SUT in place, we would get an error in the test:
//    TypeError: (0 , _reducers.color) is not a function
// 
// This error occurs when the function that we are testing, color, is not defined. 
// Simply adding the definition for the function that you wish to test will 
// provide more detailed test failure feedback.

// Let’s run the tests and watch them fail. 
// Jest will provide specific details on each failure, including a stack trace:


C:\virtualenvs\react\fast-react>jest
 FAIL  color-organizer-test\__tests__\__store__\__reducers__\color.test.js (16.758s)
  color Reducer
    × ADD_COLOR success (122ms)
    × RATE_COLOR success (9ms)

  ● color Reducer › ADD_COLOR success

    expect(received).toEqual(expected)

    Expected value to equal:
      {"color": "#90C3D4", "id": 0, "rating": 0, "timestamp": "Sat Oct 19 2019 18:45:25 GMT+0300 (East Africa Time)", "title": "Test Teal"}
    Received:
      {}

    Difference:

    - Expected
    + Received

    - Object {
    -   "color": "#90C3D4",
    -   "id": 0,
    -   "rating": 0,
    -   "timestamp": "Sat Oct 19 2019 18:45:25 GMT+0300 (East Africa Time)",
    -   "title": "Test Teal",
    - }
    + Object {}

      at Object.<anonymous> (color-organizer-test/__tests__/__store__/__reducers__/color.test.js:19:5)
          at new Promise (<anonymous>)

  ● color Reducer › RATE_COLOR success

    expect(received).toEqual(expected)

    Expected value to equal:
      {"color": "#90C3D4", "id": 0, "rating": 3, "timestamp": "Sat Oct 19 2019 13:32:09 GMT+0300 (EAT)", "title": "Test Teal"}
    Received:
      {"color": "#90C3D4", "id": 0, "rating": undefined, "timestamp": "Sat Oct 19 2019 13:32:09 GMT+0300 (EAT)", "title": "Test Teal"}

    Difference:

    - Expected
    + Received

      Object {
        "color": "#90C3D4",
        "id": 0,
    -   "rating": 3,
    +   "rating": undefined,
        "timestamp": "Sat Oct 19 2019 13:32:09 GMT+0300 (EAT)",
        "title": "Test Teal",
      }

      at Object.<anonymous> (color-organizer-test/__tests__/__store__/__reducers__/color.test.js:43:5)
          at new Promise (<anonymous>)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        33.423s
Ran all test suites.

{/* Taking the time to write the tests,
  and run them to watch them fail shows us that our tests are working as intended. 
  This failure feedback represents our to-do list. 
  It is our job to make both of these tests pass. 
  It’s time to open the /src/store/reducers.js file,
  and write the minimal code required to make our tests pass:
*/}

import C from '../constants'

export const color = (state={}, action=) => {
  switch (action.type) {
    case C.ADD_COLOR:
      return {
        id: action.id,
        title: action.title,
        color: action.color,
        timestamp: action.timestamp,
        rating: 0
      }
    case C.RATE_COLOR:
      state.rating = action.rating
      return state
    default :
      return state
  }
}

{/* The next time we run the jest command our tests should pass: */}

C:\virtualenvs\react\fast-react>jest
 PASS  color-organizer-test\__tests__\__store__\__reducers__\color.test.js (5.306s)
  color Reducer
    √ ADD_COLOR success (23ms)
    √ RATE_COLOR success (2ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        9.901s
Ran all test suites.

{/* If you look closely, this code should seem a little off. State is supposed to be immutable, 
yet here we are clearly mutating the state by changing the value for rating in the state object. 
Our tests still pass because we are not making sure that our state object is immutable. */}

{/* Deep freeze */}

{/* deep-freeze can help us make sure our state and action objects stay immutable by preventing them from changing: 
    > npm install deep-freeze --save-dev or yarn add deep-freeze --dev

    When invoking the color reducer, we will deep-freeze both the state and the action object. 
    Both objects should be immutable, 
    and deep-freezing them will cause an error if any code does try to mutate these objects:
*/}

import C from '../../../src/constants'
import { color } from '../../../src/store/reducers'
import DeepFreeze from 'deep-freeze'

/* eslint-disable no-undef */

describe('color Reducer', () => {

  it('ADD_COLOR success', () => {
    const state = {}
    const action = {
      type: C.ADD_COLOR,
      id: 0,
      title: 'Test Teal',
      color: '#90C3D4',
      timestamp: new Date().toString()
    }
    DeepFreeze(state)
    DeepFreeze(action)
    const results = color(state, action)
    expect(results)
      .toEqual({
        id: 0,
        title: 'Test Teal',
        color: '#90C3D4',
        timestamp: action.timestamp,
        rating: 0
      })
  })

  it('RATE_COLOR success', () => {
    const state = {
      id: 0,
      title: 'Test Teal',
      color: '#90C3D4',
      timestamp: 'Sat Oct 19 2019 13:32:09 GMT+0300 (EAT)',
      rating: undefined
    }
    const action = {
      type: C.RATE_COLOR,
      id: 0,
      rating: 3
    }
    DeepFreeze(state)
    DeepFreeze(action)
    const results = color(state, action)
    expect(results)
      .toEqual({
        id: 0,
        title: 'Test Teal',
        color: '#90C3D4',
        timestamp: 'Sat Oct 19 2019 13:32:09 GMT+0300 (EAT)',
        rating: 3
      })
  })
})

{/* Now we can run our modified test on our current color reducer and watch it fail,
    because rating a color mutates the incoming state: 
*/}

C:\virtualenvs\react\fast-react>jest
 FAIL  color-organizer-test\__tests__\__store__\__reducers__\color.test.js (5.695s)
  color Reducer
    √ ADD_COLOR success (20ms)
    × RATE_COLOR success (3ms)

  ● color Reducer › RATE_COLOR success

    TypeError: Cannot assign to read only property 'rating' of object '#<Object>'

      at color (color-organizer-test/src/store/reducers.js:44:20)
      at Object.<anonymous> (color-organizer-test/__tests__/__store__/__reducers__/color.test.js:46:39)
          at new Promise (<anonymous>)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        11.633s
Ran all test suites.

{/* Let’s change the color reducer so that this test will pass. 
    We will use the spread operator to make a copy of the state object before 
    we overwrite the rating: 
*/}

case 'RATE_COLOR':
  return {
    ...state,
    rating: action.rating
  }

{/* Now that we are not mutating state, both tests should pass: */}

C:\virtualenvs\react\fast-react>jest
 PASS  color-organizer-test\__tests__\__store__\__reducers__\color.test.js (5.737s)
  color Reducer
    √ ADD_COLOR success (21ms)
    √ RATE_COLOR success (2ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        10.296s
Ran all test suites.

{/* This process represents a typical TDD cycle. 
    We wrote the tests first, wrote code to make the tests pass, 
    and refactored both the code and the tests. 
    This approach is very effective when working with JavaScript, and especially Redux. 
*/}


{/* Testing the Store */}


