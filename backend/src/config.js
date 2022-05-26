import path from 'path'
const dotenv = require('dotenv-safe')
dotenv.config({
  path: path.join(__dirname,  '../.env'),
})

const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT,
    ip: process.env.IP,
    apiRoot: process.env.API_ROOT || '',
    defaultEmail: requireProcessEnv('DEFAULT_EMAIL_BACKEND'),
    defaultEmailHost: requireProcessEnv('DEFAULT_EMAIL_HOST_BACKEND'),
    defaultEmailHostPort: requireProcessEnv('DEFAULT_EMAIL_HOST_PORT_BACKEND'),
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      uri: requireProcessEnv('MONGO_URI')
    }
  }
}

module.exports = { ...config.all, ...config[config.all.env] }
export default module.exports
