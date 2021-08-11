import { success, notFound } from '../../services/response/'
import { Bot } from '.'

const { triggerEvent } = require('../../eventBus')

export const create = ({ bodymen: { body } }, res, next) =>
  Bot.create(body)
    .then((bot) => bot.view(true))
    .then(success(res, 201))
    .then((bot) => triggerEvent('create_page_facebook', bot))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Bot.find(query, select, cursor)
    .then((bots) => bots.map((bot) => bot.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Bot.findById(params.id)
    .then(notFound(res))
    .then((bot) => bot ? bot.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Bot.findById(params.id)
    .then(notFound(res))
    .then((bot) => bot ? Object.assign(bot, body).save() : null)
    .then((bot) => bot ? bot.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Bot.findById(params.id)
    .then(notFound(res))
    .then((bot) => bot ? bot.remove() : null)
    .then(success(res, 204))
    .catch(next)
