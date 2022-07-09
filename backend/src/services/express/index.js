import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import xss from 'xss-clean'

export const whitelist = ['http://localhost:3000', 'https://shvl.ai', 'http://shvl.ai']
const corsOptionsDelegate = function (req,callback) {
  let corsOptions
  console.log(whitelist.includes(req.headers.origin))
  if (whitelist.includes(req.headers.origin) && req.headers.origin !== undefined) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  if (req.headers.origin === undefined) {
    process.exit(1)
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
export default (apiRoot, routes) => {
  const app = express()
  app.use(cors(corsOptionsDelegate))
  app.use(compression())
  app.use(morgan('dev'))
  app.use(xss())
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())
  app.use(apiRoot, routes)

  return app
}
