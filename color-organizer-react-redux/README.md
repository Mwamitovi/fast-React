Color Organizer (Using React-Redux)
===================================

## SYNOPSIS

This is a modified version of the color organizer,
(see branch- feature/color-organizer-app). 
Instead of passing data up the tree through two-way function binding,
we can dispatch actions directly from child components to update application state.
We explore how the Redux store can be used with React-Redux.

``react-redux`` supplies us with a component that we can use to set up our store in the context, 
the ``provider``. We can wrap any React element within the provider and 
that element’s children will have access to the store via context.


### GRASP THE CONCEPT


Instead of setting up the store as a context variable in the App component, we can keep the App component stateless. The provider adds the store to the context and updates the App component when actions have been dispatched. The provider expects a single child component.
The provider requires that we pass the store as a property. 
It adds the store to the context so that it can be retrieved by any child of the App component. 

If we keep our UI components purely presentational, 
we can rely on React Redux to create the container components. 
React Redux helps us create container components through mapping the current state of 
the Redux store to the properties of a presentational component. 
It also maps the store’s dispatch function to callback properties.
This is all accomplished through a higher-order function called ``connect``.
``connect`` works in conjunction with the provider. 
The provider adds the store to the context and connect creates components that retrieve the store. 
When using connect, you do not have to worry about context.


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
     folder `fast-react/color-organizer-plus.js`

   - Study the "package.json" and "webpack.config.js", 
     that is where the main file conventions/standards are located.

## Build
    Run this command to build the JavaScript Bundle
    ```
    $ npm run build or yarn build
    ```

#### Run
    Run this command to build the JavaScript Bundle and open the browser to the app using the file api.
    ```
    $ npm start or yarn start
    ```

    Behind the scenes, this script initiates a sequence of commands.
      - prestart: `npm run build-exp` that initiates webpack processes.
      - build: `webpack --progress --config webpack.config.js` lanches webpack to build the app.
      - start: `http://localhost:3000 & httpster -p 3000 -d ./color-organizer-react-redux/dist` 
        launches server at port 3000, and loads the contents of dist/ folder.

   - And thus we have the stateless "color-organizer-app" that uses the ``Provider`` component and ``connect`` higher-order function from react-redux.


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
