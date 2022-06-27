import { notFound, success } from '../../services/response/'
import { SrcCollection } from '.'
import { getCollectionsAll } from '../../services/openSean/implementation'
import {
  FindProcessCreateCollection,
  FindProcessIdCreateCollection
} from '../provider/controller'

export const create = ({ bodymen: { body } }, res, next) =>
  SrcCollection.create({ ...body, status: 'created' })
    .then((srcCollection) => srcCollection.view())
    .then((srcCollection) => success(res, 201)(srcCollection))
    .catch(next)

export const importCollections = async (req, res, next) => {
  FindProcessCreateCollection().then((provider) =>
    getCollectionsAll(provider)
      .then(() => success(res, 201)({}))
  )
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  SrcCollection.count(query)
    .then((count) =>
      SrcCollection.find(query, select, { ...cursor, limit: cursor.limit === 1000 ? undefined : cursor.limit }).then((srcCollections) => ({
        count,
        rows: srcCollections.map((srcCollection) => srcCollection.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  SrcCollection.findById(params.id)
    .then(notFound(res))
    .then((srcCollection) => (srcCollection ? srcCollection.view() : null))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  SrcCollection.findById(params.id)
    .then(notFound(res))
    .then((srcCollection) =>
      srcCollection ? Object.assign(srcCollection, body).save() : null
    )
    .then((srcCollection) => (srcCollection ? srcCollection.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  SrcCollection.findById(params.id)
    .then(notFound(res))
    .then((srcCollection) => (srcCollection ? srcCollection.remove() : null))
    .then(success(res, 204))
    .catch(next)

export const changeStatus = (id, status) =>
  SrcCollection.findById(id).then((srcCollection) =>
    srcCollection ? Object.assign(srcCollection, { status }).save() : null
  )

export const CreateCollection = async (collection) => {
  const provider = await FindProcessIdCreateCollection()
  const { name, slug, detail, totalAssets } = collection
  const exist = await SrcCollection.findOne({ name, slug })
  if (exist) {
    if (exist.totalAssets < totalAssets) {
      exist.provider = provider
      exist.totalAssets = totalAssets
      exist.detail = detail
      exist.status = 're-created'
      return await exist.save()
    }
  } else {
    return await SrcCollection.create({
      ...collection,
      provider,
      status: 'created'
    })
  }
}

export const OpenseaCollectionToSrcCollection = (openseaCollection) => ({
  name: openseaCollection.name,
  slug: openseaCollection.slug,
  totalAssets: openseaCollection.stats.total_supply,
  detail: openseaCollection
})
