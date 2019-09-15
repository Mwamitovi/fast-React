/**
 * Color Organizer (with a server)
 * See branch: feature/server (detailed)
 * 
 */


// Universal Color Organizer

/**
 * In the previous chapters, we have been working on a color organization app.
 * Thus far, we’ve generated a lot of code base for this application, 
 * and it all runs in the browser. 
 * We’ve coded React components, a Redux store, and 
 * tons of action creators and helper functions. 
 * We’ve even incorporated the React Router. 
 * We already have a lot of code that can be reused if 
 * we were to create a web server.
 * 
 * Let’s create an Express server for this application and 
 * try to reuse as much code as possible. 
 */

// 1

// First, we need a module that configures an Express application instance, 
// so we'll create ./server/app.js.

// This module is the starting point for our universal application. 
// The Express configuration uses middleware for logging and file assets, 
// and eventually it responds to every request with an HTML page.

// Since we are serving HTML directly from this file, 
// we’ll need to remove the ./dist/index.html file. 
// If this file remains in place, it will be served before the response is reached.

// Webpack allows us to import assets like CSS or image files, 
// but Node.js will not know how to handle those imports. 
// We’ll need to use the ignore-styles library to make sure that 
// we are ignoring any SCSS import statements. 
// Let’s install ignore-styles:

// npm install ignore-styles --save


// 2

// In the ./src/server/index.js file, 
// we will consume the Express app instance and start the server. 
// This file represents the entry point for our Node.js server.

// This file adds React to the global instance and starts the server. 
// Additionally, we’ve included the ignore-styles module, 
// which ignores those imports so we can render components in Node.js without causing errors.

// We now have a starting point: a basic Express app configuration. 
// Any time we need to include new features on the server, 
// they will need to make their way into this app configuration module.

// For all the other changes, we will iterate on this Express application. 
// We will use code universally to create an isomorphic/universal version of the color organizer.


// Universal Redux

/**
 * All of the JavaScript in the Redux library is universal. 
 * Your reducers are written in JavaScript and should not contain code that depends upon any environment. 
 * Redux was designed to be used as a state container for browser applications, 
 * but it can be used in all types of Node.js applications, 
 * including CLIs, servers, and native applications, too.
 * 
 * We already have the code in place for the Redux store. 
 * We’ll use this store to save state changes to a JSON file on the server.
 */

// 1

// First, we need to modify the storeFactory so that it can work isomorphically. 
// At present, the storeFactory includes logging middleware that will cause errors in Node.js because 
// it utilizes the console.groupCollapsed and console.groupEnd methods. 
// Neither of these methods are available in Node.js. 

// If we create stores on the server, we’ll need to use a different logger.
// Now the storeFactory is isomorphic. 
// We created Redux middleware for logging actions on the server. 
// When the storeFactory is invoked, we’ll tell it which type of store we want and 
// the appropriate logger will be added to the new store instance.

// 2

// Let’s now use this isomorphic storeFactory to create a serverStore instance. 
// At the top of the Express configuration, 
// we’ll need to import the storeFactory and the initial state data. 
// We can use the storeFactory to create a store with initial state from a JSON file.
// ./server/app.js

import storeFactory from '../store'
import initialState from '../../data/initialState.json'

const serverStore = storeFactory(true, initialState)

// 3

// Now we have an instance of the store that will run on the server.
// Every time an action is dispatched to this instance, 
// we want to make sure the initialState.json file is updated. 
// Using the subscribe method, we can listen for state changes and 
// save a new JSON file every time the state changes.

serverStore.subscribe(
  () => fs.writeFile(
    path.join(__dirname, '../../data/initialState.json'),
    JSON.stringify(serverStore.getState()),
    error => (error) ?
      console.log("Error saving state!", error) :
      null
  )
)

// As actions are dispatched, 
// the new state is saved to the initialState.json file using the fs module.
// The serverStore is now the main source of truth. 
// Any requests will need to communicate with it in order to get the current and 
// most up-to-date list of colors. 

// 4

// We’ll add some middleware that will add the server store to 
// the request pipeline so that it can be used by other middleware during a request.

const addStoreToRequestPipeline = (req, res, next) => {
  req.store = serverStore
  next()
}

export default express()
  .use(logger)
  .use(fileAssets)
  .use(addStoreToRequestPipeline)
  .use(htmlResponse)

// Now any middleware method that comes after addStoreToRequestPipeline will 
// have access to the store on the request object. We have used Redux universally. 
// The exact same code for the store, including our reducers, will run in multiple environments.

/**
 * There are complications associated with 
 * building web servers for large applications that are not addressed by this example. 
 * Saving data to a JSON file is a quick solution for data persistence, 
 * but production applications use actual databases. 
 * 
 * Using Redux is a possible solution that may meet requirements for some applications. 
 * However, there are complications associated with forking node processes that 
 * need to be addressed in larger applications. 
 * You can investigate solutions like Firebase and other cloud providers for 
 * assistance in working with databases that can scale smoothly.
 */


// Universal Routing

/**
 * In the last chapter, we added the react-router-dom to the color organizer. 
 * The router decides which component to render based on the browser’s current location. 
 * The router can be rendered on the server as well —
 * we just need to provide the location or route.
 * So far, we’ve used the HashRouter. 
 * The router automatically adds a # before each route. 
 */

// To use the router isomorphically, we need to replace the HashRouter with the BrowserRouter, 
// which removes the preceding # from our routes.
// Now the color organizer is no longer prefacing each route with a hash. 
// At this point, the organizer still works. 
// Start it up and select one color. 
// The Color container is rendered, and 
// it changes the background of the entire screen using the ColorDetails component.

// The location bar should now look something like:
// http://localhost:3000/8658c1d0-9eda-4a90-95e1-8001e8eb6036

// There is no longer a # in front of the route. 
// Now let’s refresh the page in the browser:
// Cannot GET /8658c1d0-9eda-4a90-95e1-8001e8eb6036

// Refreshing the page causes the browser to 
// send a GET request to the server using the current route. 
// The # was used to prevent us from sending that GET request. 

// We use the BrowserRouter because we want the GET request to be sent to the server.
// In order to render the router on the server, we need a location—we need the route. 
// This route will be used on the server to tell the router to render the Color container. 

// 5

// The BrowserRouter is used when you want to render routes isomorphically.
// Now that we know what content the user is requesting, 
// let’s use it to render the UI on the server. 
// In order to render the router on the server, 
// we’ll have to make some significant changes to our Express configuration. 

// To start, we’ll need to import a few modules.

import { Provider } from 'react-redux'
import { compose } from 'redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

// We need the Provider, a compose function, the renderToString function, and the StaticRouter. 
// On the server, the StaticRouter is used when we want to render our component tree to a string.

// In order to generate an HTML response, there are three steps:
// 1. Create a store that runs on the client using the data from the serverStore.
// 2. Render the component tree as HTML using the StaticRouter.
// 3. Create the HTML page that will be sent to the client.

// We create one function for each of these steps and 
// compose them into a single function, the htmlResponse:

const htmlResponse = compose(
  buildHTMLPage, // Step 3
  renderComponentsToHTML, // Step 2
  makeClientStoreFrom(serverStore) // Step 1
)

// In this composition, the makeClientStoreFrom(serverStore) is a higher-order function.
// Initially, this function is invoked with the serverStore once. 
// It returns a function that will be invoked on every request. 
// The returned function will always have access to the serverStore.

// When htmlResponse is invoked, it expects a single argument: 
// the url that has been requested by the user. 

// For step one, we will create a higher-order function that 
// packages the url with a new client store created using the current state of the serverStore. 
// Both store and url are passed to the next function, step 2, in a single object:

const makeClientStoreFrom = store => url =>
  ({
    store: storeFactory(false, store.getState()),
    url
  })

// The output from the makeClientStoreFrom function becomes the input for 
// the renderComponentToHTML function. 
// This function expects that the url and store have been packaged into a single argument:

const renderComponentsToHTML = ({ url, store }) =>
  ({
    state: store.getState(),
    html: renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )
  })

// The renderComponentsToHTML returns an object with two properties: state and html.
// The state is obtained from the new client store and 
// the html is generated by the renderToString method. 

// Since the app still uses Redux in the browser, 
// the Provider is rendered as the root component, 
// and the new client store is passed to it as a property.

// The StaticRouter component is used to render the UI based upon the location that is being requested. 
// The StaticRouter requires a location and context. 
// The requested url is passed to the location property and an empty object is passed to context.
// When these components are rendered to an HTML string, 
// the location will be taken into account, and the StaticRouter will render the correct routes.

// This function returns the two necessary components to build the page: 
// the current state of the organizer, and the UI rendered to an HTML string.

// The state and the html can be used in the last composed function, buildHTMLPage:

const buildHTMLPage = ({ html, state, css }) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
      <meta charset="utf-8">
       <title>Universal Color Organizer</title>
    </head>
    <body>
      <div id="react-container">${html}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
      <script src="/bundle.js"></script>
    </body>
  </html>
`)

// Our color wall is now isomorphic. 
// It will render the UI on the server and send it to the client as text. 
// It will also embed the initial state of the store directly into the response.

// The browser initially displays the UI obtained in the HTML response.
// When the bundle loads, it re-renders the UI and the client takes over from there. 
// From this point on, all user interactivity including navigation will happen on the client. 
// Our single page application will function as it always has, unless the browser is refreshed, 
// at which point the server rendering process starts all over again.


// Our app now allows users to bookmark URLs and 
// send URLs to other users that will be rendered isomorphically. 
// The router decides which content to render based upon the URL. 
// It does so on the server, which means that our users can access our content rapidly.

// Isomorphic applications have the best of both worlds: 
// they can take advantage of the speediness, control, and security that server rendering provides, 
// while benefiting from the low bandwidth and speed that is gained from single page applications. 

// An isomorphic React application is essentially a server-rendered SPA, 
// which lays the foundation for you to build efficient applications that 
// will be cool but also fast and efficient.

// 6

// Incorporating server-rendered styles

// At present, we are rendering the HTML on the server, 
// but the CSS does not get rendered until the bundle is loaded in the browser. 
// The result is a strange flicker. 
// Initially we will see all of the unstyled content in the browser before the CSS is loaded. 
// When JavaScript is turned off in the browser, 
// users will not see any CSS styles at all because they are embedded in the JavaScript bundle.

// The solution is to add the styles directly to the response. 
// To do this, we must first extract the CSS from the webpack bundle into its own separate file. 
// You will need to install the extract-text-webpack-plugin:

// npm install extract-text-webpack-plugin

// You will also need to require this plugin in your webpack configuration:
// Also, in the webpack configuration, 
// we need to replace the CSS and SCSS loaders with loaders that use the ExtractTextPlugin.
// And we need to include that plugin in our configuration inside of the plugins array.
// Here, when the plugin is included, we specify the filename of the CSS file to extract.

// Now when webpack runs, it will not include the CSS in the JavaScript bundle; 
// it will instead extract all of the CSS into a separate file, ./assets/bundle.css.

// 7

// We also need to modify the Express configuration. 
// When the organizer starts, the CSS is saved as a global string. 
// We can use the filesystem or fs module to read the contents of 
// a text file into the variable staticCSS.

const staticCSS = fs.readFileSync(
  path.join(__dirname, '../../dist/assets/bundle.css')
)

// Now we have to modify the buildHTMLPage function to 
// write the CSS directly to the response inside of a <style> tag:

const buildHTMLPage = ({ html, state, css }) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
      <meta charset="utf-8">
       <title>Universal Color Organizer</title>
      <style>${staticCSS}</style>
    </head>
    <body>
      <div id="react-container">${html}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
      <script src="/bundle.js"></script>
    </body>
  </html>
`)

// CSS is now directly embedded into our response. 
// There is no longer a strange, styleless flicker. 
// When JavaScript is turned off, the styles remain in place.

// We now have an isomorphic color organizer that shares a lot of universal JavaScript.
// Initially, the color organizer is rendered on the server, 
// but it is also rendered on the browser after the page is finished loading. 
// When the browser takes over, the color organizer behaves as a single-page application.