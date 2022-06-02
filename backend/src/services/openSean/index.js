import axios from 'axios'


export const openSea = (baseURL) => {
  // eslint-disable-next-line camelcase
  const getCollection = ({ asset_owner, offset, limit, name }) => axios.get(`collection/${name}`, {
    baseURL,
    headers: {
      Accept: 'application/json'
    },
    params: {
      asset_owner, offset, limit
    }
  }).then(res => res.data)

  // eslint-disable-next-line camelcase
  const getEvents = (apikey, { only_opensea, token_id, asset_contract_address, collection_slug, collection_editor, account_address, event_type, auction_type, occurred_before, occurred_after, cursor }) =>
    axios.get('events', {
      baseURL,
      headers: {
        'X-API-KEY': apikey,
        Accept: 'application/json'
      },
      params: {
        only_opensea,
        token_id,
        asset_contract_address,
        collection_slug,
        collection_editor,
        account_address,
        event_type,
        auction_type,
        occurred_before,
        occurred_after,
        cursor
      }
    }).then(res => res.data)

  // eslint-disable-next-line camelcase
  const getAssets = (apikey, { owner, token_ids, collection, collection_slug, collection_editor, order_direction, asset_contract_address, asset_contract_addresses, limit, cursor, include_orders }) =>
    axios.get('assets', {
      baseURL,
      headers: {
        'X-API-KEY': apikey,
        Accept: 'application/json'
      },
      params: {
        owner,
        token_ids,
        collection,
        collection_slug,
        collection_editor,
        order_direction,
        asset_contract_address,
        asset_contract_addresses,
        limit,
        cursor,
        include_orders
      }
    }).then(res => res.data)

  // eslint-disable-next-line camelcase
  const getBundles = (apikey, { on_sale, owner, asset_contract_address, asset_contract_addresses, token_ids, limit, offset }) =>
    axios.get('bundles', {
      baseURL,
      headers: {
        'X-API-KEY': apikey,
        Accept: 'application/json'
      },
      params: {
        on_sale,
        owner,
        asset_contract_address,
        asset_contract_addresses,
        token_ids,
        limit,
        offset
      }
    }).then(res => res.data)

  return {
    getEvents,
    getBundles,
    getAssets,
    getCollections: getCollection
  }
}
