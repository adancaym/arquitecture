import { openSea } from './index'
import { SrcCollection } from '../../api/srcCollection'
import { Asset } from '../../api/asset'
import { CreateCollection, OpenseaCollectionToSrcCollection } from '../../api/srcCollection/controller'
import { FindKeyPublicKey} from '../../api/provider/controller'

const createAsset = (body) => Asset.findOne({ tokenId: body.tokenId, srcCollection: body.srcCollection }).then(async (asset) => asset ? await Object.assign(asset, body).save() : await Asset.create(body))
const changeCollection = async ({ name, slug }, update) => SrcCollection.findOneAndUpdate({ name, slug }, update)
const addTraitsToCollection = async (idCollection, traits) => SrcCollection
  .findById(idCollection)
  .then(async (collection) => {
    for (const trait of traits) {
      const existTrait = collection.traits.find(traitInCollection => traitInCollection.key === trait.trait_type)
      if (existTrait) {
        if (!existTrait.values.includes(trait.value)) {
          existTrait.values.push(trait.value)
        }
      } else {
        collection.traits.push({
          key: trait.trait_type,
          values: [trait.value]
        })
      }
    }
    return collection.save()
  })

const getAssets = async (collection, provider, cursor) => {
  const apikey = FindKeyPublicKey(provider)
  return openSea(provider.urlBase).getAssets(apikey, {
    collection_slug: collection.slug, limit: 200, cursor: cursor
  })
    .then(async response => {
      const { assets, next } = response
      for (const asset of assets) {
        const { traits } = asset
        await addTraitsToCollection(collection.id, traits)
        await createAsset({
          name: asset.name,
          srcCollection: collection.id,
          detail: asset,
          tokenId: asset.token_id
        })
      }
      if (!next) {
        return
      }
      await changeCollection({ name: collection.name, slug: collection.slug }, { status: 'populating' })
      return getAssets(collection, provider, next)
    })
}

export const getAssetsForCollection = async (srcCollection) => {
  const { provider } = srcCollection
  const { name, slug } = srcCollection
  switch (provider.name) {
    case 'opensea': {
      await changeCollection({ name, slug }, { status: 'Fetching' })
      await getAssets(srcCollection, provider)
        .then(() => changeCollection({ name: srcCollection.name, slug: srcCollection.slug }, { status: 'populated' }))

      break
    }
  }
}

export const findLastOffer = (provider) => async (asset) => {
  const now = new Date()
  now.setDate(new Date().getDate() - 1)
  const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)
  const occurred_after = Math.round(utcMilllisecondsSinceEpoch / 1000)
  const event_type = 'offer_entered'
  const assetStored = await Asset.findById(asset)
  const { tokenId, detail: { asset_contract: { address } } } = assetStored
 
  let events = await getEvents({asset_contract_address: address, event_type, occurred_after, token_id: tokenId}, provider, null)
  events = events.filter(cursor => cursor.event.payment_token.symbol === 'WETH')
  const max = new Date(Math.max(...events.map(ae => new Date(ae.event_timestamp))))
  return events.find(event => new Date(event.event_timestamp).getTime() === max.getTime())
  
}
let assetsEvents = []
let collectionsPool = []

export const getEvents = async ({
  occurred_after,
  event_type,
  asset_contract_address,
  token_id
}, provider, cursor) => new Promise((resolve, reject) => {
  const apikey = FindKeyPublicKey(provider)
  openSea(provider.urlBase).getEvents(apikey, {
    occurred_after, event_type, asset_contract_address, token_id, cursor
  })
    .then(async response => {
      const { asset_events, next } = response
      console.table(asset_events)
      assetsEvents = [...asset_events.map(ae => ({ event: ae, event_timestamp: ae.event_timestamp })), ...assetsEvents]
      if (process.env.NODE_ENV === 'development') {
        resolve(assetsEvents)
        return
      }
      if (!next) {
        resolve(assetsEvents)
        return
      }
      return getEvents({
        occurred_after, event_type, asset_contract_address, token_id
      }, provider, next)
    })
    .catch((e) => reject(e))
})

const getCollectionsFromOpenSea = async (provider, offset = 0) => openSea(provider.urlBase)
  .getCollectionsAll(offset).then(async response => {
    const { collections } = response
    collectionsPool = [...collections, ...collectionsPool]
    if (collections.length === 0 || offset >= 50000) {
      return
    }
    await storeCollectionsFromOpenSea(collections)
    return await getCollectionsFromOpenSea(provider, collectionsPool.length)
  })

const storeCollectionsFromOpenSea = async (collections) => Promise.all(collections
  .filter(OpenSeaConditionsToStore)
  .map(OpenseaCollectionToSrcCollection)
  .map(CreateCollection))

const OpenSeaConditionsToStore = (collectionFromOpenSea) =>
  collectionFromOpenSea.stats.count > 0 &&
  collectionFromOpenSea.stats.total_supply > 0 &&
  collectionFromOpenSea.stats.seven_day_sales > 0 &&
  collectionFromOpenSea.primary_asset_contracts.length > 0

export const getCollectionsAll = async (provider) => new Promise((resolve) => {
  switch (provider.name) {
    case 'opensea': {
      return getCollectionsFromOpenSea(provider).then(() => resolve(collectionsPool))
    }
  }
})
