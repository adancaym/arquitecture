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

var URLSafeBase64 = require('urlsafe-base64')

const vpk = require('../../vpk.json')

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



router.get("/", (req, res) => res.json({ holi: process.pid}))

router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/files', file)
router.use('/messages', message)
router.use('/menus', menu)
router.use('/groups', groups)
router.use('/providers', provider)
router.use('/suscriptions', suscription)
router.use('/processes', processs)
router.use('/catalogs', catalogs)
router.use('/srcCollections', srcCollection)
router.use('/assets', asset)
router.use('/wallets', wallet)
router.use('/bids', bid)
router.use('/placements', placement)

router.get('/key', (req, res, next) => {
  res.send(URLSafeBase64.decode(vpk.publicKey))
})

export default router
