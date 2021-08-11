import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Bot, { schema } from './model'

const router = new Router()
const { name, route } = schema.tree

/**
 * @api {post} /bots Create bot
 * @apiName CreateBot
 * @apiGroup Bot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Bot's name.
 * @apiParam route Bot's route.
 * @apiSuccess {Object} bot Bot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bot not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, route }),
  create)

/**
 * @api {get} /bots Retrieve bots
 * @apiName RetrieveBots
 * @apiGroup Bot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} bots List of bots.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /bots/:id Retrieve bot
 * @apiName RetrieveBot
 * @apiGroup Bot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} bot Bot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bot not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /bots/:id Update bot
 * @apiName UpdateBot
 * @apiGroup Bot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Bot's name.
 * @apiParam route Bot's route.
 * @apiSuccess {Object} bot Bot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bot not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, route }),
  update)

/**
 * @api {delete} /bots/:id Delete bot
 * @apiName DeleteBot
 * @apiGroup Bot
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Bot not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
