import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import {create, index, show, update, destroy, myWallets} from './controller'
import { schema } from './model'
export Wallet, { schema } from './model'

const router = new Router()
const { name, secret } = schema.tree

/**
 * @api {post} /wallets Create wallet
 * @apiName CreateWallet
 * @apiGroup Wallet
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Wallet's name.
 * @apiParam secret Wallet's secret.
 * @apiSuccess {Object} wallet Wallet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Wallet not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, secret }),
  create)

/**
 * @api {get} /wallets Retrieve wallets
 * @apiName RetrieveWallets
 * @apiGroup Wallet
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of wallets.
 * @apiSuccess {Object[]} rows List of wallets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

router.get('/myWallets',
  token({ required: true }),
  query(),
  myWallets)

/**
 * @api {get} /wallets/:id Retrieve wallet
 * @apiName RetrieveWallet
 * @apiGroup Wallet
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} wallet Wallet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Wallet not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /wallets/:id Update wallet
 * @apiName UpdateWallet
 * @apiGroup Wallet
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Wallet's name.
 * @apiParam secret Wallet's secret.
 * @apiSuccess {Object} wallet Wallet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Wallet not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, secret }),
  update)

/**
 * @api {delete} /wallets/:id Delete wallet
 * @apiName DeleteWallet
 * @apiGroup Wallet
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Wallet not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
