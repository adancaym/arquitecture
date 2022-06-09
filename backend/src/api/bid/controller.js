import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Bid } from '.'
import { Placement } from '../placement'
import { Process } from '../process'
import { findLastOffer } from '../../services/openSean/implementation'

export const create = ({ header, user, bodymen: { body } }, res, next) => {
  console.log('body', body)
  return Bid.create({ ...body, user })
    .then((bid) => bid.view(true))
    .then(success(res, 201))
    .then(saveBid)
    .catch(next)
}

export const saveBid = (bid) => {
  const { assets, id, user, wallet } = bid
  assets
    .map(asset => ({ asset, bid: id, status: 'created', user: user.id, wallet }))
    .forEach(async bid => {
      const process = await Process.findOne({ name: 'extract-events' })
        .populate('provider')
        .then(p => p.view())

      switch (process.provider.name) {
        case 'opensea': {
          try {
            const { event } = await findLastOffer(process)(bid.asset)
            delete event.asset
            bid.event = [event]
            await Placement.create(bid).then(p => p.view())
          } catch (e) {
            await Placement.create(bid).then(p => p.view())
          }

          break
        }
      }
    }
    )
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Bid.count(query)
    .then(count => Bid.find(query, select, cursor)
      .populate('user wallet')
      .then((bids) => ({
        count,
        rows: bids.map((bid) => bid.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const myBids = ({ querymen: { query, select, cursor }, user }, res, next) =>
  Bid.count({ ...query, user: user.id })
    .then(count => Bid.find({ ...query, user: user.id }, select, { ...cursor, limit: Infinity })
      .populate('wallet assets')
      .then(async (bids) => {
        const rows = []
        for (const bid of bids) {
          rows.push(await bid.viewWithPlacements())
        }
        return {
          count,
          rows
        }
      })
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Bid.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((bid) => bid ? bid.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Bid.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((bid) => bid ? Object.assign(bid, body).save() : null)
    .then((bid) => bid ? bid.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Bid.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((bid) => bid ? bid.remove() : null)
    .then(success(res, 204))
    .catch(next)
