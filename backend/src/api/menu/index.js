import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Menu, { schema } from './model'

const router = new Router()
const { name, menus, color, icon, path } = schema.tree

/**
 * @api {post} /menus Create menu
 * @apiName CreateMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Menu's name.
 * @apiParam menus Menu's menus.
 * @apiParam color Menu's color.
 * @apiParam icon Menu's icon.
 * @apiParam path Menu's path.
 * @apiSuccess {Object} menu Menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Menu not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, menus, color, icon, path }),
  create)

/**
 * @api {get} /menus Retrieve menus
 * @apiName RetrieveMenus
 * @apiGroup Menu
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of menus.
 * @apiSuccess {Object[]} rows List of menus.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /menus/:id Retrieve menu
 * @apiName RetrieveMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} menu Menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Menu not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /menus/:id Update menu
 * @apiName UpdateMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Menu's name.
 * @apiParam menus Menu's menus.
 * @apiParam color Menu's color.
 * @apiParam icon Menu's icon.
 * @apiParam path Menu's path.
 * @apiSuccess {Object} menu Menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Menu not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, menus, color, icon, path }),
  update)

/**
 * @api {delete} /menus/:id Delete menu
 * @apiName DeleteMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Menu not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
