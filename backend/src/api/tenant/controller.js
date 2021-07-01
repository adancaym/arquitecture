import { success, notFound } from '../../services/response/'
import { Tenant } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Tenant.create(body)
    .then((tenant) => tenant.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tenant.find(query, select, cursor)
    .then((tenants) => tenants.map((tenant) => tenant.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Tenant.findById(params.id)
    .then(notFound(res))
    .then((tenant) => tenant ? tenant.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Tenant.findById(params.id)
    .then(notFound(res))
    .then((tenant) => tenant ? Object.assign(tenant, body).save() : null)
    .then((tenant) => tenant ? tenant.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Tenant.findById(params.id)
    .then(notFound(res))
    .then((tenant) => tenant ? tenant.remove() : null)
    .then(success(res, 204))
    .catch(next)
