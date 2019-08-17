Color Organizer (Redux)
=======================

## SYNOPSIS

Redux emerged as one of the clear winners in the field of Flux or Flux-like libraries. 
Redux is based on Flux, and it was designed to tackle the challenge of understanding how 
data changes flow through your application.

We have implemented color organizer application, around the Redux concept (see branch- feature/redux). 
Redux introduces reducers, which are pure functions that return a new state based on 
the current state and an action. We also explore the use of middleware in creating a factory, that we later use to create our store - the entry point to changing our app state.


### Assumptions
   - Configure your Version Control (Git-flow)
   - Fork the repository (https://github.com/Mwamitovi/fast-React)
   - You are within branch, "feature/redux"


### Installation/Configure

   - To follow-closely, look for summarized verion of the app within
     folder `color-organizer-redux/handle-state-with-redux.js`

   - Study the "package.json" and "webpack.config.js", 
     that is where the main file conventions/standards are located.

   - Run this npm/yarn command to install dependencies:
     ```
     $ npm install or yarn install
     ```

   - Run this npm/yarn command to build the JavaScript bundle:
     ```
     $ npm run build or yarn build
     ```

   - Run this npm/yarn command to build the JavaScript bundle and 
     open the browser to the app using the file api:
     ```
     $ npm start or yarn start
     ```
     Behind the scenes, this script initiates a sequence of commands.
      - prestart: `npm run build` that initiates webpack processes.
      - build: `webpack --progress` lanches webpack to build the app.
      - start: `http://localhost:3000 & httpster -p 3000 -d ./color-organizer-redux/dist` 
        launches server at port 3000, and loads the contents of dist/ folder.

   - And thus we have the stateful "color-organizer-redux" with one "store" - a redux concept.


### Redux features

You can interact with the store from the console in this demo:

```javascript

    // Dispatch an addColor action
    store.dispatch(
        addColor("Bonkers Blue", "#1122FF")
    )

    // Rate an existing color (check state for ids)
    store.dispatch(
        rateColor("8658c1d0-9eda-4a90-95e1-8001e8eb6036", 5)
    )

    // Sort colors by title or date or rating
    store.dispatch(
        sortColors("title")
    )

    // Change a colors rating (check state for ids)
    store.dispatch(
        removeColor("a5685c39-6bdc-4727-9188-6c9a00bf7f95")
    )

    // Get the store's current State
    store.getState()

```

### Further help

    - This project reference: Learning React (Functional Web development with React & Redux)
      available at http://bit.ly/learning-react-2e

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
