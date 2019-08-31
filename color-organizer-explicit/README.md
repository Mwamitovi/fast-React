Color Organizer (Passing the Redux Store Explicitly)
====================================================

## SYNOPSIS

This is a modified version of the color organizer,
(see branch- feature/color-organizer-app). 
Instead of passing data up the tree through two-way function binding,
we can dispatch actions directly from child components to update application state.
We explore how the Redux store can be used without any additional frameworks.

The first, and most logical, way to incorporate the store into your UI is to 
pass it down the component tree explicitly as a property. 
This approach is simple and works very well for smaller apps that 
only have a few nested components.


### Assumptions
   - Configure your Version Control (Git-flow)
   - Clone the repository (https://github.com/Mwamitovi/fast-React)
   - You are within branch, "feature/react-redux"
   - Yarn is an alternative node package manager, by facebook.


### Clone and Install

## Installation
    Run this command to install dependencies.
    ```
    $ npm install or yarn
    ```

   - To follow-closely, look for summarized verion of the app within
     folder `color-organizer-app/color-organizer-plus.js`

   - Study the "package.json" and "webpack.config.exp.js", 
     that is where the main file conventions/standards are located.

## Build
    Run this command to build the JavaScript Bundle
    ```
    $ npm run build-exp or yarn build-exp
    ```

#### Run
    Run this command to build the JavaScript Bundle and open the browser to the app using the file api.
    ```
    $ npm start-exp or yarn start-exp
    ```

    Behind the scenes, this script initiates a sequence of commands.
      - prestart-exp: `npm run build-exp` that initiates webpack processes.
      - build-exp: `webpack --progress --config webpack.config.exp.js` lanches webpack to build the app.
      - start-exp: `http://localhost:3000 & httpster -p 3000 -d ./color-organizer-explicit/dist` 
        launches server at port 3000, and loads the contents of dist/ folder.

   - And thus we have the stateful "color-organizer-app" with the "store passed explicitly".


### Further help

    - This project reference: Learning React (Functional Web development with React & Redux)
      available at http://bit.ly/learning-react-2e

    - To know more about node-sass, see https://www.npmjs.com/package/node-sass#readme

    - Want to utilize httpster more, read https://www.npmjs.com/package/httpster#readme

    - Read more about UUID, at https://secure.travis-ci.org/kelektiv/node-uuid.svg?branch=master
      and the [RFC4122] http://www.ietf.org/rfc/rfc4122.txt


### Contribution guidelines
   - Gitflow remote collaboration model
   - Code review (pull requests)
   - Writing tests (Unit and Functional tests)
   - Other guidelines shall be issued with time.

### Who i talk to?
   - Contact: @MwamiTovi on GitHub
   - Email directly: matovu.synergy@gmail.com
