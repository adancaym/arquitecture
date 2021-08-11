import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Tenant, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /tenants Create tenant
 * @apiName CreateTenant
 * @apiGroup Tenant
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Tenant's name.
 * @apiSuccess {Object} tenant Tenant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tenant not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name }),
  create)

/**
 * @api {get} /tenants Retrieve tenants
 * @apiName RetrieveTenants
 * @apiGroup Tenant
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} tenants List of tenants.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /tenants/:id Retrieve tenant
 * @apiName RetrieveTenant
 * @apiGroup Tenant
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} tenant Tenant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tenant not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /tenants/:id Update tenant
 * @apiName UpdateTenant
 * @apiGroup Tenant
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Tenant's name.
 * @apiSuccess {Object} tenant Tenant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tenant not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name }),
  update)

/**
 * @api {delete} /tenants/:id Delete tenant
 * @apiName DeleteTenant
 * @apiGroup Tenant
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tenant not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
