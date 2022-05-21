import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'

export Process, {schema } from './model'

const { name, provider, requireApiKey } = schema.tree
const router = new Router()

/**
 * @api {post} /processes Create process
 * @apiName CreateProcess
 * @apiGroup Process
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Process's name.
 * @apiParam provider Process's provider.
 * @apiSuccess {Object} process Process's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Process not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, provider, requireApiKey }),
  create)

/**
 * @api {get} /processes Retrieve processes
 * @apiName RetrieveProcesses
 * @apiGroup Process
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of processes.
 * @apiSuccess {Object[]} rows List of processes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /processes/:id Retrieve process
 * @apiName RetrieveProcess
 * @apiGroup Process
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} process Process's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Process not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /processes/:id Update process
 * @apiName UpdateProcess
 * @apiGroup Process
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Process's name.
 * @apiParam provider Process's provider.
 * @apiSuccess {Object} process Process's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Process not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, provider, requireApiKey }),
  update)

/**
 * @api {delete} /processes/:id Delete process
 * @apiName DeleteProcess
 * @apiGroup Process
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Process not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
