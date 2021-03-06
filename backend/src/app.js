import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express, {whitelist} from './services/express'
import api from './api'
import { socketIo } from './services/socketIo/io'
import {initSocket} from './api/srcCollection/indexScoket';


const app = express(apiRoot, api)

const server = http.createServer(app)



socketIo(server, whitelist)

if (mongo.uri) {
  mongoose.connect(mongo.uri, () => {
    console.log('Connection Moongo success')
  })
}
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => console.log(`Express server listening on port ${port}, in ${env} mode`))
})

export default app
