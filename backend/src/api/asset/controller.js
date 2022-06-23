import { notFound, success } from '../../services/response/'
import { Asset } from '.'
import {
  pipelineFindBySrcCollectionAndTraitValue,
  pipelineFindCollectionRangeTokenId,
  pipelineFindTraitCollection
} from './pipelines'
import { SrcCollection } from '../srcCollection'
import { getAssetsForCollection } from '../../services/openSean/implementation'

export const create = ({ bodymen: { body } }, res, next) => Asset.create(body)
  .then((asset) => asset.view(true))
  .then(success(res, 201))
  .catch(next)

export const pupulateCollectionAsset = async (req, res, next) => SrcCollection
  .find(
    { $or: [{ status: { $eq: 'created' } }, { status: { $eq: 're-created' } }] },
    {},
    {
      sort: {
        totalAssets: -1
      }
    }
  )
  .populate('provider')
  .then(srcCollections => srcCollections.map(srcCollection => srcCollection.view()))
  .then(async srcCollections => {
    for (const srcCollection of srcCollections) {
      await getAssetsForCollection(srcCollection)
    }
    return srcCollections
  })
  .then(success(res, 200))

export const pupulateCollectionStats = async (req, res, next) => SrcCollection
  .find(
    { status: 'populated' },
    {},
    {
      sort: {
        totalAssets: -1
      }
    }
  )
  .populate('provider')
  .then(srcCollections => Promise.all(srcCollections.map(extractStatsFromCollectionAssets)))
  .then(srcCollections => srcCollections.map(srcCollection => srcCollection.view()))
  .then(success(res, 200))

export const extractStatsFromCollectionAssets = async (collection) => Asset
  .find(
    { srcCollection: collection.id },
    { tokenId: 1 },
    {
      sort: {
        tokenId: -1
      }
    })
  .then(async assets => {
    const tokens = assets.map(asset => asset.tokenId)
    collection.totalAssetPopulated = assets.length
    console.log(assets.length, collection.status)
    collection.maxToken = tokens.shift() ?? 0
    collection.minToken = tokens.pop() ?? 0
    return collection.save()
  })

export const index = ({ querymen: { query, select, cursor } }, res, next) => Asset.count(query)
  .then(count => Asset.find(query, select, cursor)
  .populate('srcCollection')
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
  Asset.aggregate(pipelineFindTraitCollection(srcCollection)).then(r => {
    // eslint-disable-next-line camelcase
    const traits = r.map(r => [...r.traits]).reduce((a, b) => a.concat(b), [])
    // eslint-disable-next-line camelcase
    const rows = Array.from(new Set(traits.map(t => t.trait_type)))
    // eslint-disable-next-line camelcase
    return { count: rows.length, rows }
  })
    .then(success(res))
    .catch(next)

export const findTraitValuesBySrcCollectionAndTypeTrait = ({ query: { srcCollection, type_trait } }, res, next) =>
  Asset.aggregate(pipelineFindTraitCollection(srcCollection)).then(r => {
    const traits = r.map(r => [...r.traits]).reduce((a, b) => a.concat(b), [])
    const rows = Array.from(new Set(traits.filter(t => t.trait_type === type_trait).map(t => t.value)))
    return { count: rows.length, rows }
  })
    .then(success(res))
    .catch(next)

