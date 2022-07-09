import {FindProcessCreateCollection} from '../provider/controller'
import {openSea} from '../../services/openSean'

export const createCollectionSocket = (socket) => (name) =>
  FindProcessCreateCollection()
    .then((provider) =>
      openSea(provider.urlBase)
        .getCollection({name})
        .then(({collection}) => {
          socket.emit('collectionImg', collection.image_url)
          socket.emit('collectionName', collection.name)
          socket.emit('collectionPaymentTokents', collection.payment_tokens)
          socket.emit('collectionDescription', collection.description)
          return collection
        })
        .then(collection => new Promise((resolve) => setTimeout(() => {
          resolve(collection)
        }, 1000)))
        .then(collection => getCollectionsByEditorsAndSlug(collection.primary_asset_contracts, name, provider))
        .then(collection => console.log(collection))
        .catch(err => console.log(err))
    )

const getCollectionsByEditorsAndSlug = async (primary_asset_contracts, slug, provider) => new Promise((resolve) => primary_asset_contracts.length > 0 ? resolve(null) :
  getCollectionByEditor(primary_asset_contracts.length > 0 ? primary_asset_contracts.pop() : resolve(null), provider)
    .then(collections => collections.find(collection => collection.slug === slug))
    .then(collection => !collection ? getCollectionsByEditorsAndSlug(primary_asset_contracts, slug, provider) : resolve(collection))
)


// eslint-disable-next-line camelcase
const getCollectionByEditor = (primary_asset_contracts, provider) => openSea(provider.urlBase)
  .getCollectionsAll({asset_owner: primary_asset_contracts.payout_address})
  .then(collections => {
    console.log(collections, primary_asset_contracts)
    return collections
  })
  .then(collections => new Promise((resolve) => setTimeout(() => resolve(collections), 1000)))
