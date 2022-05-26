import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import { socketIo } from './services/socketIo/io'
import listEndpoints from 'express-list-endpoints'
import axios from "axios";

const app = express(apiRoot, api)

const server = http.createServer(app)

console.table(listEndpoints(app))

socketIo(server)

if (mongo.uri) {
  mongoose.connect(mongo.uri,mongo.options, () => {
    console.log('Connection Moongo success')
    console.log(mongo)
  })
}
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on port %s, in %s mode', port, env)
  })
})

export default app
