import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Bid } from '.'
import { Placement } from '../placement'

export const create = ({ header, user, bodymen: { body } }, res, next) => Bid.create({ ...body, user })
  .then((bid) => bid.view(true))
  .then(success(res, 201))
  .then(saveBid)
  .catch(next)

export const saveBid = (bid) => {
  const { assets, id, user, wallet } = bid
  assets
    .map(asset => ({ asset, bid: id, status: 'created', user: user.id, wallet }))
    .forEach(bid =>
      Placement.create(bid)
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
