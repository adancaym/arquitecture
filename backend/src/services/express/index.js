import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'
const whitelist = ['http://localhost:3000', 'https://shvl.ai', 'http://shvl.ai']
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  console.log(whitelist.includes(req.headers.origin))
  if (whitelist.includes(req.headers.origin)) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors(corsOptionsDelegate))
    app.use(compression())
    app.use(morgan('dev'))
  }
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())
  return app
}
