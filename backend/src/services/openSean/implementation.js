import { openSea } from './index'
import { SrcCollection } from '../../api/srcCollection'
import { Asset } from '../../api/asset'

const getAssets = async (collection, provider, cursor) => {
  const [apikey] = provider.keyId
  openSea(provider.urlBase).getAssets(apikey, {
    collection_slug: collection.name,
    limit: 200,
    cursor: cursor
  }).then(async response => {
    const { assets, next } = response
    for (const asset of assets) {
      const body = {
        name: asset.name,
        srcCollection: collection.id,
        provider: provider.name,
        apikey: apikey,
        asset
      }
      await Asset.create(body)
    }
    if (!next) return
    await getAssets(collection, provider, next)
  }).catch(console.log)
}

export const fullProcess = (processes) => (srcCollection) => {
  const processCreateCollection = processes.find(p => p.name === 'create-collection')
  const { provider } = processCreateCollection
  switch (provider.name) {
    case 'opensea': {
      return SrcCollection
        .findOneAndUpdate({
          name: srcCollection.name
        }, {
          status: 'Fetching'
        }).then(() => {
          openSea(provider.urlBase).getCollections({
            name: srcCollection.name
          }).then(async srcCollectionResponse => {
            await SrcCollection
              .findOneAndUpdate({
                name: srcCollection.name
              }, {
                status: 'Fetched',
                srcCollection: srcCollectionResponse,
                provider: provider.name
              })
            return srcCollection
          }).then(async srcCollection => {
            await getAssets(srcCollection, provider, undefined)
            await SrcCollection
              .findOneAndUpdate({
                name: srcCollection.name
              }, {
                status: 'Assets Complete'
              })
          })
            .catch(() => {
              return SrcCollection
                .findOneAndUpdate({
                  name: srcCollection.name
                }, {
                  status: 'Failed'
                })
            })
        })
    }
  }
}
