Color Organizer (Presentational Vs Container Approach)
======================================================

## SYNOPSIS

This is a modified version of the color organizer,
(see branch- feature/color-organizer-app). 
Instead of passing data up the tree through two-way function binding,
we can dispatch actions directly from child components to update application state.
We explore how the Redux store can be used without any additional frameworks.

In the above approach (see- ),
the Color component retrieved the store via context and used it to dispatch actions directly. 
And the ColorList component retrieved the store via context to read the current list of colors from state.
In both scenarios, these components rendered UI elements by interacting directly with the Redux store.
We can improve the architecture of our app by decoupling the store from components that render the UI.
It's important to note that we still pass the store via context but just change the architecture.


## GRASP THE CONCEPT


Presentational components are components that only render UI elements.
They are reusable. 
They are easy to swap out and easy to test. 
They can be composed to create the UI.
They can be reused across browser apps that may use different data libraries.
Our AddColorForm, ColorList, Color, StarRating, and Star components that are typical presentational components. They receive data via props, and when events occur, they invoke callback function properties.

Container components are components that connect presentational components to the data.
They are not concerned with the UI at all.
Their main focus is connecting the presentation components to the data architecture.
They can be reused across device platforms to connect the native presentational components to the data.
Our App component will mostly remain the same, 
since it still defines the store in the context so that it can be retrieved by child components. 
Instead of rendering the SortMenu, AddColorForm, and ColorList components, however, 
it will render "containers" for those items. The Menu container will connect the SortMenu, 
NewColor will connect the AddColorForm, and Colors will connect the ColorList.
Thus all of the Redux functionality is connected within the Menu, NewColor and Colors components.
You'll notice that all of the action creators are imported and used in this one place - containers.js. 
This is the only file that invokes store.getState() or store.dispatch().

This approach of separating UI components from containers that 
connect them to data is generally a good approach. 
However, this could be overkill for a small project, proof of concept, or prototype.
Retrieving the store from the context is a nice way to reduce your boilerplate,
but this is not something that is required for every application. 

In fact the creator of Redux, even suggests that these patterns do not need to be religiously followed:
Separating the container and presentational components is often a good idea, 
but you shouldn’t take it as dogma. Only do this when it truly reduces the of your codebase.

** Dan Abramov, “Presentational and Container Components”, Medium, March 23, 2015. (http://bit.ly/2mJfLw4)


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

   - Study the "package.json" and "webpack.config.ner.js", 
     that is where the main file conventions/standards are located.

## Build
    Run this command to build the JavaScript Bundle
    ```
    $ npm run build-ner or yarn build-ner
    ```

#### Run
    Run this command to build the JavaScript Bundle and open the browser to the app using the file api.
    ```
    $ npm start-ner or yarn start-ner
    ```

    Behind the scenes, this script initiates a sequence of commands.
      - prestart-exp: `npm run build-ner` that initiates webpack processes.
      - build-exp: `webpack --progress --config webpack.config.ner.js` lanches webpack to build the app.
      - start-exp: `http://localhost:3000 & httpster -p 3000 -d ./color-organizer-container/dist` 
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
