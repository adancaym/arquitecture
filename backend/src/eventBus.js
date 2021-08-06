const { EventEmitter } = require('events')

const em = new EventEmitter()

const registerEvent = (eventName, callback) =>
{
  em.on(eventName, callback)
  console.log(eventName, 'registered')
}
const triggerEvent = (eventName, args) =>
{
  em.emit(eventName, args)
  console.log(eventName, 'trigered')
}

module.exports = {
  em, registerEvent, triggerEvent
}
