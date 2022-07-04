import { success, notFound } from '../../services/response/'
import { Logs } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Logs.create(body)
    .then((logs) => logs.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Logs.count(query)
    .then(count => Logs.find(query, select, cursor)
      .then((logs) => ({
        count,
        rows: logs.map((logs) => logs.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Logs.findById(params.id)
    .then(notFound(res))
    .then((logs) => logs ? logs.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Logs.findById(params.id)
    .then(notFound(res))
    .then((logs) => logs ? Object.assign(logs, body).save() : null)
    .then((logs) => logs ? logs.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Logs.findById(params.id)
    .then(notFound(res))
    .then((logs) => logs ? logs.remove() : null)
    .then(success(res, 204))
    .catch(next)
