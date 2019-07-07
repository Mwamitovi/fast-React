Recipe App
==========

## SYNOPSIS

We draw into the concept of components inorder to display "recipes".
Using a functional approach, we create two main components - Menu and Recipe.
We break the Recipe component further into smaller, 
more focused stateless functional components and compose them together.


## IMPORTANT

** Notice the use of the following,
   - ES6: using latest features of JavaScript
   - JSX: write syntax similar to HTML
   - babel: transpile/convert source code into browser-supported code
   - webpack: bundles all modules into a single file


## GET - STARTED

### Assumptions
   - Configure your Version Control (Git-flow)
   - Fork the repository (https://github.com/Mwamitovi/fast-React)
   - switch to branch, "recipe-app"

### Configure

   - Study the "package.json" and "webpack.config.js", 
     that is where the main file conventions/standards are located.

   - Run `npm run-script start` to launch the app.
     Behind the scenes, this script initiates a sequence of commands.
      - prestart: `npm run build` that initiates webpack processes.
      - build: `webpack --progress` lanches webpack to build the app.
      - start: `opener recipe-app/dist/index.html` launches the app in browser.

   - And there you have the simple "recipe-app" which can be scaled easily.


### Further help

    - This project reference: Learning React (Functional Web development with React & Redux)
      available at http://bit.ly/learning-react-2e


### Contribution guidelines
   - Gitflow remote collaboration model
   - Code review (pull requests)
   - Writing tests (Unit and Functional tests)
   - Other guidelines shall be issued with time.

### Who i talk to?
   - Contact: @MwamiTovi on GitHub
   - Email directly: matovu.synergy@gmail.com
