import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Wallet } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Wallet.create({ ...body, user })
    .then((wallet) => wallet.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Wallet.count(query)
    .then(count => Wallet.find(query, select, cursor)
      .populate('user')
      .then((wallets) => ({
        count,
        rows: wallets.map((wallet) => wallet.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const myWallets = ({ querymen: { query, select, cursor }, user }, res, next) =>
  Wallet.count({ ...query, user: user.id })
    .then(count => Wallet.find({ ...query, user: user.id }, select, { ...cursor, user: 0 })
      .then((wallets) => ({
        count,
        rows: wallets.map((wallet) => wallet.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Wallet.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((wallet) => wallet ? wallet.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Wallet.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((wallet) => wallet ? Object.assign(wallet, body).save() : null)
    .then((wallet) => wallet ? wallet.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Wallet.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((wallet) => wallet ? wallet.remove() : null)
    .then(success(res, 204))
    .catch(next)
