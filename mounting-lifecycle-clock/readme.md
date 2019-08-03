Clock App - Mounting lifecycle
==============================

## SYNOPSIS

Component lifecycle is a series of methods that can be invoked every time we mount or 
update a component. These methods are invoked either before or after the component renders the UI.
The two primary lifecycles are- mounting and updating.

We implement a stateful Clock component while exploring some the mounting lifecycle,
so as to understand how to handle this lifecycle primarily within React.


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
   - You are within branch, "feature/update-lifecycle"

### Configure

   - Study the "package.json" and "clock.webpack.config.js", 
     that is where the main file conventions/standards are located.

   - Run `npm run-script start-clock` to launch the app.
     Behind the scenes, this script initiates a sequence of commands.
      - prestart-clock: `npm run build-clock` that initiates webpack processes.
      - build-clock: `webpack --progress --config clock.webpack.config.js` lanches webpack to build the app.
      - start-clock: `http://localhost:3000 & httpster -p 3000 -d ./mounting-lifecycle-clock/dist` 
        launches server at port 3000, and loads the contents of dist/ folder.

   - And thus we have the stateful "clock-app" with a "single state of truth".


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
