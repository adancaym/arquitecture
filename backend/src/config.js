/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}
/* istanbul ignore next */
const dotenv = require('dotenv-safe')
dotenv.config({
  path: path.join(__dirname, process.env.NODE_ENV === 'test' ? '../.env.test': process.env.NODE_ENV !== 'production' ? '../.env.development': '../.env'),
  example: path.join(__dirname, '../.env.example')
})

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT,
    ip: process.env.IP,
    apiRoot: process.env.API_ROOT || '',
    defaultEmail: requireProcessEnv('DEFAULT_EMAIL_BACKEND'),
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      uri: requireProcessEnv('MONGO_URI'),
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    }
  }
}

module.exports = merge(config.all, config[config.all.env], requireProcessEnv)
export default module.exports
