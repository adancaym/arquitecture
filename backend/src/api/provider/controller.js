import { success, notFound } from '../../services/response/'
import { Provider } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Provider.create(body)
    .then((provider) => provider.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Provider.count(query)
    .then(count => Provider.find(query, select, cursor)
      .then((providers) => ({
        count,
        rows: providers.map((provider) => provider.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? provider.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? Object.assign(provider, body).save() : null)
    .then((provider) => provider ? provider.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? provider.remove() : null)
    .then(success(res, 204))
    .catch(next)
