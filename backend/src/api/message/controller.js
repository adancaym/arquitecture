import {success, notFound} from '../../services/response/'
import {Message} from '.'

export const create = ({body, io}, res, next) =>
  Message.create(body)
    .then((message) => message.view(true))
    .then((message) => {
      io.emit('receiveMessage' + message.from, message);
      io.emit('receiveMessage' + message.to, message);
      return message;
    })
    .then(success(res, 201))
    .catch(next)

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  Message.find(query, select, cursor)
    .then((messages) => messages.map((message) => message.view()))
    .then(success(res))
    .catch(next)

export const indexFromTo = ({params}, res, next) =>
  Message.find({$or: [{...params}, {from: params.to, to: params.from}]})
    .then((messages) => messages.map((message) => message.view()))
    .then(success(res))
    .catch(next)

export const show = ({params}, res, next) =>
  Message.findById(params.id)
    .then(notFound(res))
    .then((message) => message ? message.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({bodymen: {body}, params}, res, next) =>
  Message.findById(params.id)
    .then(notFound(res))
    .then((message) => message ? Object.assign(message, body).save() : null)
    .then((message) => message ? message.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({params}, res, next) =>
  Message.findById(params.id)
    .then(notFound(res))
    .then((message) => message ? message.remove() : null)
    .then(success(res, 204))
    .catch(next)
