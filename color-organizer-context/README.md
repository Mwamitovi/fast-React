Color Organizer (Passing the Redux Store via Context)
=====================================================

## SYNOPSIS

This is a modified version of the color organizer,
(see branch- feature/color-organizer-app). 
Instead of passing data up the tree through two-way function binding,
we can dispatch actions directly from child components to update application state.
We explore how the Redux store can be used without any additional frameworks.

The drawback of using the first approach (color-organizer-explicit: https://github.com/Mwamitovi/fast-React/tree/feature/react-redux/color-organizer-explicit#readme)
is that we have to explicitly pass the store to child components,
which means slightly more code and slightly more headaches than with other approaches.

Now imagine that we have some goods to move within Uganda (Country) from Kampala, to Arua.
We could use a train, but that would require that we lay tracks through at least nine districts so that our cargo can travel to Arua. This is like “explicitly passing the store” down the component tree from 
the root to the leaves. You have to “lay tracks” through every component that 
comes between the origin and the destination.
If using a train is like explicitly passing the store through props, 
then implicitly passing the store via context is like using a jet airliner. 
When a jet flies from Kampala to Arua, it flies over at least nine districts — no tracks required.

Similarly, we can take advantage of a React feature called ``context`` that allows us to pass 
variables to components without having to explicitly pass them down through the tree as properties. 
Any child component can access these context variables.


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

   - Study the "package.json" and "webpack.config.context.js", 
     that is where the main file conventions/standards are located.

## Build
    Run this command to build the JavaScript Bundle
    ```
    $ npm run build-cont or yarn build-cont
    ```

#### Run
    Run this command to build the JavaScript Bundle and open the browser to the app using the file api.
    ```
    $ npm start-cont or yarn start-cont
    ```

    Behind the scenes, this script initiates a sequence of commands.
      - prestart-exp: `npm run build-cont` that initiates webpack processes.
      - build-exp: `webpack --progress --config webpack.config.context.js` lanches webpack to build the app.
      - start-exp: `http://localhost:3000 & httpster -p 3000 -d ./color-organizer-context/dist` 
        launches server at port 3000, and loads the contents of dist/ folder.

   - And thus we have the stateful "color-organizer-app" with the "store passed via context".


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
