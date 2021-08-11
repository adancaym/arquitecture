import {Router} from 'express'
import {middleware as query} from 'querymen'
import {middleware as body} from 'bodymen'
import {token} from '../../services/passport'
import {create, index, show, update, destroy, indexIn} from './controller'
import {schema} from './model'

export Shop, {schema} from './model'

const router = new Router()
const {name, products, picture, description} = schema.tree

/**
 * @api {post} /shops Create shop
 * @apiName CreateShop
 * @apiGroup Shop
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Shop's name.
 * @apiParam products Shop's products.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({required: true}),
  body({name, products, picture, description}),
  create)

/**
 * @api {get} /shops Retrieve shops
 * @apiName RetrieveShops
 * @apiGroup Shop
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} shops List of shops.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({required: true}),
  query(),
  index)


/**
 * @api {get} /shops/:id Retrieve shop
 * @apiName RetrieveShop
 * @apiGroup Shop
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({required: true}),
  show)

/**
 * @api {put} /shops/:id Update shop
 * @apiName UpdateShop
 * @apiGroup Shop
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Shop's name.
 * @apiParam products Shop's products.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({required: true}),
  body({name, products, picture, description}),
  update)

/**
 * @api {delete} /shops/:id Delete shop
 * @apiName DeleteShop
 * @apiGroup Shop
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Shop not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({required: true}),
  destroy)

export default router
