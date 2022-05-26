import { success, notFound } from '../../services/response/'
import { Menu } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Menu.create(body)
    .then((menu) => menu.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Menu.count(query)
    .then(count => Menu.find(query, select, cursor)
      .populate('menus')
      .then((menus) => ({
        count,
        rows: menus.map((menu) => menu.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Menu.findById(params.id)
    .then(notFound(res))
    .then((menu) => menu ? menu.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Menu.findById(params.id)
    .then(notFound(res))
    .then((menu) => menu ? Object.assign(menu, body).save() : null)
    .then((menu) => menu ? menu.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Menu.findById(params.id)
    .then(notFound(res))
    .then((menu) => menu ? menu.remove() : null)
    .then(success(res, 204))
    .catch(next)
