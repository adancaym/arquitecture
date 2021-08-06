const { registerEvent } = require('../../eventBus')

const { createPage } = require('./creaate-page')
const { login } = require('./login')

const registerEvents = () => {
  registerEvent('create_page_facebook', createPage)
  registerEvent('login_facebook', login)
}

module.exports = {
  registerEvents
}
