import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {master, token} from '../../services/passport'
import {
  create,
  index,
  show,
  update,
  destroy,
  dispatch,
  dispatched,
  dispatchedError,
  outBidPlacement
} from './controller'
import { schema } from './model'
export Placement, { schema } from './model'

const router = new Router()
const { asset, status, bid, wallet } = schema.tree

/**
 * @api {post} /placements Create placement
 * @apiName CreatePlacement
 * @apiGroup Placement
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam asset Placement's asset.
 * @apiParam status Placement's status.
 * @apiParam bid Placement's bid.
 * @apiSuccess {Object} placement Placement's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Placement not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ asset, status, bid, wallet }),
  create)

/**
 * @api {get} /placements Retrieve placements
 * @apiName RetrievePlacements
 * @apiGroup Placement
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of placements.
 * @apiSuccess {Object[]} rows List of placements.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)


router.get('/dispatch',
  master(),
  dispatch)

router.get('/dispatch/outbif',
  // master(),
  outBidPlacement)

router.put('/dispatched/:id',
  master(),
  dispatched)

router.put('/dispatched/error/:id',
  master(),
  dispatchedError)

/**
 * @api {get} /placements/:id Retrieve placement
 * @apiName RetrievePlacement
 * @apiGroup Placement
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} placement Placement's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Placement not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /placements/:id Update placement
 * @apiName UpdatePlacement
 * @apiGroup Placement
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam asset Placement's asset.
 * @apiParam status Placement's status.
 * @apiParam bid Placement's bid.
 * @apiSuccess {Object} placement Placement's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Placement not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ asset, status, bid, wallet }),
  update)

/**
 * @api {delete} /placements/:id Delete placement
 * @apiName DeletePlacement
 * @apiGroup Placement
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Placement not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
