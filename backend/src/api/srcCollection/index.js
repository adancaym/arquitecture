import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export SrcCollection, { schema } from './model'

const router = new Router()
const { name, provider, apikey, srcCollection } = schema.tree

/**
 * @api {post} /srcCollections Create src collection
 * @apiName CreateSrcCollection
 * @apiGroup SrcCollection
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Src collection's name.
 * @apiParam provider Src collection's provider.
 * @apiParam apikey Src collection's apikey.
 * @apiParam srcCollection Src collection's srcCollection.
 * @apiSuccess {Object} srcCollection Src collection's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Src collection not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name }),
  create)

/**
 * @api {get} /srcCollections Retrieve src collections
 * @apiName RetrieveSrcCollections
 * @apiGroup SrcCollection
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of src collections.
 * @apiSuccess {Object[]} rows List of src collections.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /srcCollections/:id Retrieve src collection
 * @apiName RetrieveSrcCollection
 * @apiGroup SrcCollection
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} srcCollection Src collection's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Src collection not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /srcCollections/:id Update src collection
 * @apiName UpdateSrcCollection
 * @apiGroup SrcCollection
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Src collection's name.
 * @apiParam provider Src collection's provider.
 * @apiParam apikey Src collection's apikey.
 * @apiParam srcCollection Src collection's srcCollection.
 * @apiSuccess {Object} srcCollection Src collection's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Src collection not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, provider, apikey, srcCollection }),
  update)

/**
 * @api {delete} /srcCollections/:id Delete src collection
 * @apiName DeleteSrcCollection
 * @apiGroup SrcCollection
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Src collection not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
