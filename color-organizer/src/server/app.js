import express from 'express'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import api from './color-api'
import App from '../components/App'
import storeFactory from '../store'
import initialState from '../../data/initialState.json'

const staticCSS = fs.readFileSync(
  // path.join(__dirname, '../../dist/assets/bundle.css')
  // used raw css to by-pass build process for css/scss files (ubuntu)
  path.join(__dirname, '../stylesheets/colorStyles.css')
)

const fileAssets = express.static(
  path.join(__dirname, '../../dist/assets')
)

const serverStore = storeFactory(true, initialState)

serverStore.subscribe(
  () => fs.writeFile(
    path.join(__dirname, '../../data/initialState.json'),
    JSON.stringify(serverStore.getState()),
    error => (error)
      ? console.log('Error saving state!', error)
      : null
  )
)

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

const renderComponentsToHTML = ({ url, store }) =>
// returns the state of the app, and UI rendered to an HTML string
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

const makeClientStoreFrom = store => url =>
// Higher-Order-Function invoked on every request
// returns a functions that always has access to the store
  ({
    url,
    store: storeFactory(false, store.getState())
  })

const htmlResponse = compose(
  buildHTMLPage,
  renderComponentsToHTML,
  makeClientStoreFrom(serverStore)
)

const respond = (req, res) =>
  res.status(200).send(htmlResponse(req.url))

const logger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`)
  next()
}

const addStoreToRequestPipeline = (req, res, next) => {
  req.store = serverStore
  next()
}

export default express()
  .use(bodyParser.json())
  .use(logger)
  .use(fileAssets)
  .use(addStoreToRequestPipeline)
  .use('/api', api)
  .use(respond)
