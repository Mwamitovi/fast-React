Basic Website (React Router demo)
=================================

## SYNOPSIS

Routing is the process of defining endpoints for your client’s requests.
These endpoints work with the browser’s location and history objects.
They are used to identify requested content so that JavaScript can load and render the right UI.

We test implement this routing functionality while building a simple company website.
The sitemap for this website consists of a home page, a page for each section, 
and an error page to handle 404 Not Found errors.

``react-router-dom`` provides a couple of options for managing the navigation history in SPAs.
We shall particularly implement the ``HashRouter`` which was designed for the client.
Traditionally, hashes in the location bar were used to define anchor links.
When the # is used in the location bar, the browser does not make a server request.
When using the HashRouter, the # is always required before all routes.
The ``HashRouter`` is a nice tool to use for new projects or for small client sites that 
do not require a backend.


### Assumptions
   - Configure your Version Control (Git-flow)
   - Clone the repository (https://github.com/Mwamitovi/fast-React)
   - You are within branch, "feature/react-router"
   - Yarn is an alternative node package manager, by facebook.


### Clone and Install

## Installation
    Run this command to install dependencies.
    ```
    $ npm install or yarn
    ```

   - To follow-closely, look for summarized verion of the app within
     folder `fast-react/company-site.js`

   - Study the "package.json" and "webpack.config.exp.js", 
     that is where the main file conventions/standards are located.

#### Run
    Run this command to build the JavaScript Bundle and open the browser to the app using the file api.
    ```
    $ npm start-site or yarn start-site
    ```

    Behind the scenes, this script initiates a sequence of commands.
      - `http://localhost:3000 & webpack-dev-server --config ./site.webpack.config.js` 
        launches server at port 3000.

   - And thus we have a basic website structure, implemented using the "HashRouter".


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
