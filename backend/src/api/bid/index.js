import {Router} from 'express'
import {middleware as query} from 'querymen'
import {middleware as body} from 'bodymen'
import {token} from '../../services/passport'
import {create, index, show, update, destroy, nextTest} from './controller'
import {schema} from './model'

export Bid, {schema} from './model'

const router = new Router()
const {wallet, minimalBid, maximalBid, outbidAmount, expirationTime, assets} = schema.tree

/**
 * @api {post} /bids Create bid
 * @apiName CreateBid
 * @apiGroup Bid
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam wallet Bid's wallet.
 * @apiParam minimalBid Bid's minimalBid.
 * @apiParam maximalBid Bid's maximalBid.
 * @apiParam outbidAmount Bid's outbidAmount.
 * @apiParam expirationTime Bid's expirationTime.
 * @apiParam assets Bid's assets.
 * @apiSuccess {Object} bid Bid's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bid not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({required: true}),
  body({wallet, minimalBid, maximalBid, outbidAmount, expirationTime, assets}),
  create)

/**
 * @api {get} /bids Retrieve bids
 * @apiName RetrieveBids
 * @apiGroup Bid
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of bids.
 * @apiSuccess {Object[]} rows List of bids.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({required: true}),
  query(),
  index)

/**
 * @api {get} /bids/:id Retrieve bid
 * @apiName RetrieveBid
 * @apiGroup Bid
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} bid Bid's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bid not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({required: true}),
  show)

/**
 * @api {put} /bids/:id Update bid
 * @apiName UpdateBid
 * @apiGroup Bid
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam wallet Bid's wallet.
 * @apiParam minimalBid Bid's minimalBid.
 * @apiParam maximalBid Bid's maximalBid.
 * @apiParam outbidAmount Bid's outbidAmount.
 * @apiParam expirationTime Bid's expirationTime.
 * @apiParam assets Bid's assets.
 * @apiSuccess {Object} bid Bid's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bid not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({required: true}),
  body({wallet, minimalBid, maximalBid, outbidAmount, expirationTime, assets}),
  update)

/**
 * @api {delete} /bids/:id Delete bid
 * @apiName DeleteBid
 * @apiGroup Bid
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Bid not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({required: true}),
  destroy)

export default router
