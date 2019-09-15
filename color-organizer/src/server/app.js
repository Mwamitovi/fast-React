import express from 'express'
import path from 'path'
import fs from 'fs'

const fileAssets = express.static(
  path.join(__dirname, '../../dist/assets')
)

const logger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`)
  next()
}

const respond = (req, res) =>
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Universal Color Organizer</title>
      </head>
      <body>
        <div id="react-container">ready...</div>
      </body>
    </html>
  `)

export default express()
  .use(logger)
  .use(fileAssets)
  .use(respond)
