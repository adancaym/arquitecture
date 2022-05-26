import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Groups, { schema } from './model'

const router = new Router()
const { name, menus } = schema.tree

/**
 * @api {post} /groups Create groups
 * @apiName CreateGroups
 * @apiGroup Groups
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Groups's name.
 * @apiParam menus Groups's menus.
 * @apiSuccess {Object} groups Groups's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Groups not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, menus }),
  create)

/**
 * @api {get} /groups Retrieve groups
 * @apiName RetrieveGroups
 * @apiGroup Groups
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of groups.
 * @apiSuccess {Object[]} rows List of groups.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /groups/:id Retrieve groups
 * @apiName RetrieveGroups
 * @apiGroup Groups
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} groups Groups's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Groups not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /groups/:id Update groups
 * @apiName UpdateGroups
 * @apiGroup Groups
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Groups's name.
 * @apiParam menus Groups's menus.
 * @apiSuccess {Object} groups Groups's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Groups not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, menus }),
  update)

/**
 * @api {delete} /groups/:id Delete groups
 * @apiName DeleteGroups
 * @apiGroup Groups
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Groups not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
