import { success, notFound } from '../../services/response/'
import { Asset } from '.'
import {
  pipelineFindBySrcCollectionAndTraitValue,
  pipelineFindCollectionRangeTokenId,
  pipelineFindTraitTypesBySrcCollection,
  pipelineFindTraitValuesBySrcCollectionAndTypeTrait
} from './pipelines'

export const create = ({ bodymen: { body } }, res, next) => Asset.create(body)
  .then((asset) => asset.view(true))
  .then(success(res, 201))
  .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => Asset.count(query)
  .then(count => Asset.find(query, select, cursor)
    .then((assets) => ({
      count, rows: assets.map((asset) => asset.view())
    })))
  .then(success(res))
  .catch(next)

export const show = ({ params }, res, next) => Asset.findById(params.id)
  .then(notFound(res))
  .then((asset) => asset ? asset.view() : null)
  .then(success(res))
  .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) => Asset.findById(params.id)
  .then(notFound(res))
  .then((asset) => asset ? Object.assign(asset, body).save() : null)
  .then((asset) => asset ? asset.view(true) : null)
  .then(success(res))
  .catch(next)

export const destroy = ({ params }, res, next) => Asset.findById(params.id)
  .then(notFound(res))
  .then((asset) => asset ? asset.remove() : null)
  .then(success(res, 204))
  .catch(next)

export const findBySrcCollectionAndTraitValue = ({
  query: { srcCollection, traitType, value },
  querymen: { select }
}, res, next) => Asset
  .count(pipelineFindBySrcCollectionAndTraitValue(srcCollection, traitType, value))
  .then(count => Asset
    .find(pipelineFindBySrcCollectionAndTraitValue(srcCollection, traitType, value), select)
    .then(rows => ({ count, rows }))
  )
  .then(success(res))
  .catch(next)

export const findCollectionRangeTokenId = ({ query: { srcCollection, from, to }, querymen: { select } }, res, next) =>
  Asset.count(pipelineFindCollectionRangeTokenId(srcCollection, from, to))
    .then(count => Asset
      .find(pipelineFindCollectionRangeTokenId(srcCollection, from, to), select)
      .then(rows => ({ count, rows }))
    )
    .then(success(res))
    .catch(next)

export const findBySrcCollection = ({ query: { srcCollection }, querymen: { select } }, res, next) =>
  Asset.count({ srcCollection: { $eq: srcCollection } })
    .then(count => Asset
      .find({ srcCollection: { $eq: srcCollection } }, select)
      .then(rows => ({ count, rows }))
    )
    .then(success(res))
    .catch(next)

export const findTraitTypesBySrcCollection = ({ query: { srcCollection } }, res, next) =>
  Asset.aggregate(pipelineFindTraitTypesBySrcCollection(srcCollection))
    .then(r => {
      const [result] = r
      // eslint-disable-next-line camelcase
      const { trait_types } = result
      // eslint-disable-next-line camelcase
      return { count: trait_types.length, rows: trait_types }
    })
    .then(success(res))
    .catch(next)

// eslint-disable-next-line camelcase
export const findTraitValuesBySrcCollectionAndTypeTrait = ({ query: { srcCollection, type_trait } }, res, next) =>
  Asset.aggregate(pipelineFindTraitValuesBySrcCollectionAndTypeTrait(srcCollection, type_trait)).then(r => {
    const [result] = r
    // eslint-disable-next-line camelcase
    const { trait_values } = result
    // eslint-disable-next-line camelcase
    return { count: trait_values.length, rows: trait_values }
  })
    .then(success(res))
    .catch(next)
