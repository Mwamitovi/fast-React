/**
 * Color Organizer (with a server)
 * See branch: feature/server (detailed)
 * 
 */


// Isomorphism versus Universalism


// The terms isomorphic and universal are often used to 
// describe applications that work on both the client and the server. 
// Although these terms are used interchangeably to describe the same application, 
// there is a subtle difference between them that is worth investigating. 

// Isomorphic applications are applications that can be rendered on multiple platforms.
// Universal code means that the exact same code can run in multiple environments.1
// 1 Gert Hengeveld, “Isomorphism vs Universal JavaScript”, Medium.

// We could build a module that would print the names to the console in 
// either a browser or a Node.js application.
// This JavaScript file is now isomorphic; it contains universal JavaScript. 
// All of the code is not universal, but the file itself will work in both environments. 
// It can run it with Node.js or include it in a <script> tag in the browser.

var printNames = response => {
  var people = JSON.parse(response).results,
    names = people.map(
      ({ name }) => `${name.last}, ${name.first}`
    )
  console.log(names.join('\n'))
}

if (typeof window !== 'undefined') {
  const request = new XMLHttpRequest()
  request.open('GET', 'http://api.randomuser.me/?nat=US&results=10')
  request.onload = () => printNames(request.response)
  request.send()

} else {
  
  const https = require('https')
  https.get(
    'http://api.randomuser.me/?nat=US&results=10',
    res => {
      let results = ''
      res.setEncoding('utf8')
      res.on('data', chunk => results += chunk)
      res.on('end', () => printNames(results))
    }
  )
}


// Server Rendering React

// Using the ReactDOM.renderToString method allows us to render UI on the server.
// Servers are powerful; 
// they have access to all kinds of resources that browsers do not.
// Servers can be secure, and access secure data. 
// You can use all of these added benefits to your advantage by 
// rendering initial content on the server.


// Building a web server using Node.js & Express

// 1

// Express is a library that we can use to rapidly develop web servers:
// npm install express --save

// 2

// Let’s take a look at a simple Express app. 
// This code creates a web server that always serves the message “Hello World”. 

// First, information about each request is logged to the console. 
// Then the server responds with some HTML. 
// Both of these steps are contained in their own function and 
// chained together with the .use() method. 
// Express automatically injects request and 
// response arguments into each of these functions as arguments.

import express from 'express'

// The logger and sayHello functions are middleware. 
// In Express, middleware functions are chained together into a pipeline with the .use() method. 
// When a request occurs, each middleware function is invoked in order until a response is sent. 
// This Express app logs details about each request to the console and then sends an HTML response: 
// <h1>Hello World</h1>. 
// Finally, we start the Express app by telling it to listen for incoming requests locally on port 3000.

const logger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`)
  next()
}

const sayHello = (req, res) =>
  res.status(200).send("<h1>Hello World</h1>")

const app = express()
  .use(logger)
  .use(sayHello)

app.listen(3000, () =>
  console.log(`Recipe app running at 'http://localhost:3000'`)
)

// 3

// We will use the babel-cli to run this Express app because it contains ES6 import statements that 
// are not supported by the current version of Node.js.

/**
 * babel-cli 
 * 
 * It is not a great solution for running apps in production,
 * and we don’t have to use to babel-cli to run every Node.js app that uses ES6. 
 * As of this writing, the current version of Node.js supports a lot of ES6 syntax. 
 * You could simply choose not to use import statements. 
 * Future versions of Node.js will support import statements.
 * 
 * Another option is to create a webpack build for your backend code.
 * webpack can export a JavaScript bundle that can be ran with older versions of Node.js.
 */


// In order to run babel-node, there is a little bit of setup involved. 
// First, we need to install the babel-cli, babel-loader, babel-preset-es2015, 
// babel-preset-react, and babel-preset-stage-0: 

// npm install babel-cli babel-loader babel-preset-env babel-preset-react babel-preset-stage-0 --save

// 4

// Next, we need to make sure we add a .babelrc file to the root of our project. 
// When we run babel-node index-server.js, 
// Babel will look for this file and apply the presets that we have installed:

  {
    "presets": [
      "env",
      "stage-0",
      "react"
    ]
  }

// 5

// Finally, let’s add a start script to our package.json file. 
// If you do not already have a package.json file, 
// create one by running npm init:

"scripts": {
  "start": "./node_modules/.bin/babel-node index-server.js"
}

// 6

// Now we can run our Express server with the command npm start:
// npm start
// Recipe app running at 'http://localhost:3000'

// Once the server is running, 
// you can open a web browser and navigate to http://localhost:3000. 
// You will see the message “Hello World” in the page.


// Once our Express app responds properly, we can update it.
// Instead of rendering the "Hello World" message, 
// let’s render the Recipe app that we worked with back in Chapters 4 and 5. 


// Rendering the "Recipes" app


// We can make this modification by rendering the Menu component with 
// some recipe data using renderToString from ReactDOM:

// 1
// index-server.js

// First we import 
// react, the renderToString method, the Menu component, and some recipes for our initial data. 
// React is exposed globally, so the renderToString method can work properly.

// Next, the HTML is obtained by invoking the renderToString function and sending it the Menu component.
// Finally, we can create a new middleware function, 
// sendHTMLPage, that responds to all requests with an HTML string. 
// This string wraps the server-rendered HTML in boilerplate that is necessary for creating a page.

// Now when you start this application and navigate to http://localhost:3000 in a browser, 
// you will see that the recipes have been rendered. 
// We have not included any JavaScript in this response.
// The recipes are already on the page as HTML.

// So far we have server-rendered the Menu component. 
// Our application is not yet isomorphic, as the components are only rendered on the server. 
// To make it isomorphic, we will add some JavaScript to the response so that 
// the same components can be rendered in the browser.

// 2
// index-client.js

// This file will render the same Menu component, with the same recipe data. 
// We know that the data is the same because it will already be included in our response as a string. 
// When the browser loads this script, the __DATA__ will already exist in the global scope. 
// The alert methods are used to see when the browser renders the UI.

// 3

// We’ll need to build this client.js file into a bundle that can be used by the browser.
// So we need a basic configuration of webpack to handle the build.

// 4

// We want to build the client bundle every time we start our app, 
// so we’ll need to add a prestart script to the package.json file.

// 5

// The last step is to modify the server. 
// We need to write the initial __DATA__ to the response as a string. 
// We also need to include a script tag with a reference to our client bundle. 
// Lastly, we need to make sure our server sends static files from the ./assets/ directory.

// <script> tags have been added directly to the response. 
// The data is written to the first script tag and the bundle is loaded in the second one. 
// Additionally, middleware has been added to our request pipeline. 
// When the /bundle.js file is requested, the express.static middleware will respond with that 
// file instead of the serverrendered HTML because it is in the ./assets folder.


// Now we are isomorphically rendering the React components, 
// first on the server and then in the browser. 
// When you run this app, 
// you will see alert pop ups before and after the components are rendered in the browser. 

// You may notice that before you clear the first alert, the content is already there. 
// This is because it is initially rendered on the server.
// It may seem silly to render the same content twice, but there are advantages. 
// This app renders the same content in all browsers, even if JavaScript is turned off.

// Because the content is loaded with the initial request, 
// your website will run faster and deliver necessary content to your mobile users more quickly.3
// (3 Andrew H. Farmer, “Should I use React Server-Side Rendering?”)
// It will not have to wait for a mobile processor to render the UI—the UI is already in place. 
// Additionally, this app gains all of the advantages of an SPA. 
// Isomorphic React applications give you the best of both worlds.

