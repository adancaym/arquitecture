import { success, notFound } from '../../services/response/'
import srcCollection, { SrcCollection } from '.'
import { Process } from '../process/index'
import { fullProcess } from '../../services/openSean/implementation'

export const create = ({ bodymen: { body } }, res, next) =>
  SrcCollection.create({ ...body, status: 'registered' })
    .then((srcCollection) => srcCollection.view(true))
    .then((srcCollection) => {
      Process.find()
        .populate('provider')
        .then(process => process.map(p => p.view()))
        .then(processes => {
          fullProcess(processes)(srcCollection)
        })
      return srcCollection
    }
    )
    .then((srcCollection) => success(res, 201)(srcCollection))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  SrcCollection.count(query)
    .then(count => SrcCollection.find(query, select, cursor)
      .then((srcCollections) => ({
        count,
        rows: srcCollections.map((srcCollection) => srcCollection.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  SrcCollection.findById(params.id)
    .then(notFound(res))
    .then((srcCollection) => srcCollection ? srcCollection.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  SrcCollection.findById(params.id)
    .then(notFound(res))
    .then((srcCollection) => srcCollection ? Object.assign(srcCollection, body).save() : null)
    .then((srcCollection) => srcCollection ? srcCollection.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  SrcCollection.findById(params.id)
    .then(notFound(res))
    .then((srcCollection) => srcCollection ? srcCollection.remove() : null)
    .then(success(res, 204))
    .catch(next)
