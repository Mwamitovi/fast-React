Color Organizer App
===================

## SYNOPSIS

Understanding State management is critical in React, and as we build this project, 
we explore how to effectively introduce "state" within an application.

To enable users to add, remove and rate colors,  
we functionally use three main components (App, AddColorForm and ColorList) 
which handle two main tasks - to pass state data down the component tree via properties,
and then pass that data back up this tree via two-way function binding.
As a result, all of the state for this entire project exists in one place - App component,
and thus the `Color Organizer` has a "single source of truth".


## IMPORTANT

** Notice the use of the following,
   - ES6: using latest features of JavaScript
   - JSX: write syntax similar to HTML
   - babel: transpile/convert source code into browser-supported code
   - webpack: bundles all modules into a single file
   - node-sass: binds Node.js to LibSass, the C-version of the stylesheet preprocessor, Sass.
   - httpster: simple http-server for quick loading of content
   - uuid: generates unique identifiers


## GET - STARTED

### Assumptions
   - Configure your Version Control (Git-flow)
   - Fork the repository (https://github.com/Mwamitovi/fast-React)
   - You are within branch, "feature/color-organizer-app"

### Configure

   - To follow-closely, look for summarized verion of the app within
     folder `color-organizer-app/color-organizer-app.js`

   - Study the "package.json" and "webpack.config.js", 
     that is where the main file conventions/standards are located.

   - Run `npm run-script start` to launch the app.
     Behind the scenes, this script initiates a sequence of commands.
      - prestart: `npm run build` that initiates webpack processes.
      - build: `webpack --progress` lanches webpack to build the app.
      - start: `http://localhost:3000 & httpster -p 3000 -d ./color-organizer-app/dist` 
        launches server at port 3000, and loads the contents of dist/ folder.

   - And thus we have the stateful "color-organizer-app" with a "single state of truth".


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
