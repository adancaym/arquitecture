import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Shop } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Shop.create({ ...body, user })
    .then((shop) => shop.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Shop.find(query, select, cursor)
    .then((shops) => shops.map((shop) => shop.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => shop ? shop.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Shop.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((shop) => shop ? Object.assign(shop, body).save() : null)
    .then((shop) => shop ? shop.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Shop.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((shop) => shop ? shop.remove() : null)
    .then(success(res, 204))
    .catch(next)
