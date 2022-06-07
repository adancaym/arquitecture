import { openSea } from './index'
import { SrcCollection } from '../../api/srcCollection'
import { Asset } from '../../api/asset'

const createAsset = (body) => Asset.create(body)
const changeCollection = (name, update) => SrcCollection.findOneAndUpdate({ name }, update)

const getAssets = async (collection, provider, cursor) => new Promise((resolve, reject) => {
  const [apikey] = provider.keyId

  openSea(provider.urlBase).getAssets(apikey, {
    collection_slug: collection.name,
    limit: 200,
    cursor: cursor
  })
    .then(async response => {
      const { assets, next } = response
      for (const asset of assets) {
        const body = {
          name: asset.name,
          srcCollection: collection.id,
          provider: provider.name,
          apikey: apikey,
          asset
        }
        await createAsset(body)
      }
      if (!next) {
        resolve()
        return
      }
      await changeCollection(collection.name, 'Fetching assets')
      return getAssets(collection, provider, next)
    })
    .catch((e) => reject(e))
})

export const fullProcessCreateCollection = (processes) => (srcCollection) => {
  const { provider } = processes
  const { name } = srcCollection
  switch (provider.name) {
    case 'opensea': {
      return changeCollection(name, { status: 'Fetching' })
        .then(() => {
          openSea(provider.urlBase).getCollections({ name })
            .then(async srcCollectionResponse => {
              await changeCollection(srcCollection.name, {
                status: 'Fetched',
                srcCollection: srcCollectionResponse,
                provider: provider.name
              })
              return srcCollection
            })
            .then(async srcCollection => getAssets(srcCollection, provider, undefined))
            .then(() => changeCollection(name, { status: 'Assets Complete' }))
            .catch(() => changeCollection(name, { status: 'Failed' }))
        })
    }
  }
}

export const findLastOffer = (process) => async (asset) => {
  const now = new Date()
  now.setDate(new Date().getDate() - 1)
  const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)
  const occurred_after = Math.round(utcMilllisecondsSinceEpoch / 1000)
  const event_type = 'offer_entered'
  const assetStored = await Asset.findById(asset)
  const { asset: { asset_contract: { address }, token_id } } = assetStored
  let events = await getEvents({
    asset_contract_address: address,
    event_type,
    occurred_after,
    token_id
  }, process.provider, null)

  events = events.filter(cursor => cursor.event.payment_token.symbol === 'WETH')
  const max = new Date(Math.max(...events.map(ae => new Date(ae.event_timestamp))))
  return events.find(event => new Date(event.event_timestamp).getTime() === max.getTime())
}
let assetsEvents = []
export const getEvents = async ({
  occurred_after,
  event_type,
  asset_contract_address,
  token_id
}, provider, cursor) => new Promise((resolve, reject) => {
  const [apikey] = provider.keyId
  console.log(cursor, '_____________________cursor')
  openSea(provider.urlBase).getEvents(apikey, {
    occurred_after,
    event_type,
    asset_contract_address,
    token_id,
    cursor
  })
    .then(async response => {
      const { asset_events, next } = response
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
        occurred_after,
        event_type,
        asset_contract_address,
        token_id
      }, provider, next)
    })
    .catch((e) => reject(e))
})
