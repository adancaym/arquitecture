import http from 'http'
import {env, mongo, port, ip, apiRoot} from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import {socketIo} from './services/socketIo/io';

const app = express(apiRoot, api)
const server = http.createServer(app)


socketIo(server)

if (mongo.uri) {
  mongoose.connect(mongo.uri).then(() => {
    console.log('Connection Moongo success')
  })
}
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on port %s, in %s mode', port, env)
  })
})

export default app
