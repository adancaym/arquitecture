import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Suscription, { schema } from './model'

const router = new Router()
const { name, validity, price } = schema.tree

/**
 * @api {post} /suscriptions Create suscription
 * @apiName CreateSuscription
 * @apiGroup Suscription
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Suscription's name.
 * @apiParam validity Suscription's validity.
 * @apiParam price Suscription's price.
 * @apiSuccess {Object} suscription Suscription's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Suscription not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, validity, price }),
  create)

/**
 * @api {get} /suscriptions Retrieve suscriptions
 * @apiName RetrieveSuscriptions
 * @apiGroup Suscription
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of suscriptions.
 * @apiSuccess {Object[]} rows List of suscriptions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /suscriptions/:id Retrieve suscription
 * @apiName RetrieveSuscription
 * @apiGroup Suscription
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} suscription Suscription's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Suscription not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /suscriptions/:id Update suscription
 * @apiName UpdateSuscription
 * @apiGroup Suscription
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Suscription's name.
 * @apiParam validity Suscription's validity.
 * @apiParam price Suscription's price.
 * @apiSuccess {Object} suscription Suscription's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Suscription not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, validity, price }),
  update)

/**
 * @api {delete} /suscriptions/:id Delete suscription
 * @apiName DeleteSuscription
 * @apiGroup Suscription
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Suscription not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
