import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import file from './file'
import message from './message'
import menu from './menu'
import groups from './groups'
import provider from './provider'
import suscription from './suscription'
import processs from './process'
import catalogs from './catalogs'
import srcCollection from './srcCollection'
import asset from './asset'
import wallet from './wallet'
import bid from './bid'
import placement from './placement'
import logs, { Logs } from './logs'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
const logger = async (req, res, next) => {
  const log = Logs.create({ request: { headers: req.headers, body: req.body, params: req.params, query: req.query, url: req.url, all: JSON.stringify(req) } })
  res.on('finish', () => {
    log.response = { statusCode: res.statusCode, headers: res.headers, body: res.body, all: JSON.stringify(res) }
  })
  next()
}
router.get('/', logger, (req, res) => res.json({ holi: process.pid }))

router.use('/users', logger, user)
router.use('/auth', logger, auth)
router.use('/password-resets', logger, passwordReset)
router.use('/files', logger, file)
router.use('/messages', logger, message)
router.use('/menus', logger, menu)
router.use('/groups', logger, groups)
router.use('/providers', logger, provider)
router.use('/suscriptions', logger, suscription)
router.use('/processes', logger, processs)
router.use('/catalogs', logger, catalogs)
router.use('/srcCollections', logger, srcCollection)
router.use('/assets', logger, asset)
router.use('/wallets', logger, wallet)
router.use('/bids', logger, bid)
router.use('/placements', logger, placement)
router.use('/logs', logger, logs)

export default router
