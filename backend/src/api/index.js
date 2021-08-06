import {Router} from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import bot from './bot'
import product from './product'
import file from './file'
import message from './message'
import shop from './shop'
import photo from './photo'

var URLSafeBase64 = require('urlsafe-base64');

const vpk = require('../../vpk.json');



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

router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/bots', bot)
router.use('/products', product)
router.use('/files', file)
router.use('/messages', message)
router.use('/shops', shop)
router.use('/photos', photo)

router.get('/key', (req, res, next) => {
  res.send(URLSafeBase64.decode(vpk.publicKey));
})


export default router
