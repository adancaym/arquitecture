import { success, notFound } from '../../services/response/'
import { Suscription } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Suscription.create(body)
    .then((suscription) => suscription.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Suscription.count(query)
    .then(count => Suscription.find(query, select, cursor)
      .then((suscriptions) => ({
        count,
        rows: suscriptions.map((suscription) => suscription.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Suscription.findById(params.id)
    .then(notFound(res))
    .then((suscription) => suscription ? suscription.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Suscription.findById(params.id)
    .then(notFound(res))
    .then((suscription) => suscription ? Object.assign(suscription, body).save() : null)
    .then((suscription) => suscription ? suscription.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Suscription.findById(params.id)
    .then(notFound(res))
    .then((suscription) => suscription ? suscription.remove() : null)
    .then(success(res, 204))
    .catch(next)
