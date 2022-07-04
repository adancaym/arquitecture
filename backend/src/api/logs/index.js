import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Logs, { schema } from './model'

const router = new Router()
const { request, response } = schema.tree

/**
 * @api {post} /logs Create logs
 * @apiName CreateLogs
 * @apiGroup Logs
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam request Logs's request.
 * @apiParam response Logs's response.
 * @apiSuccess {Object} logs Logs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Logs not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ request, response }),
  create)

/**
 * @api {get} /logs Retrieve logs
 * @apiName RetrieveLogs
 * @apiGroup Logs
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of logs.
 * @apiSuccess {Object[]} rows List of logs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /logs/:id Retrieve logs
 * @apiName RetrieveLogs
 * @apiGroup Logs
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} logs Logs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Logs not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /logs/:id Update logs
 * @apiName UpdateLogs
 * @apiGroup Logs
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam request Logs's request.
 * @apiParam response Logs's response.
 * @apiSuccess {Object} logs Logs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Logs not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ request, response }),
  update)

/**
 * @api {delete} /logs/:id Delete logs
 * @apiName DeleteLogs
 * @apiGroup Logs
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Logs not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
