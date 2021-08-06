import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Photo } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Photo.create({ ...body, user })
    .then((photo) => photo.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Photo.find(query, select, cursor)
    .populate('user')
    .then((photos) => photos.map((photo) => photo.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Photo.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((photo) => photo ? photo.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Photo.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((photo) => photo ? Object.assign(photo, body).save() : null)
    .then((photo) => photo ? photo.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Photo.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((photo) => photo ? photo.remove() : null)
    .then(success(res, 204))
    .catch(next)
