import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import {
  create,
  index,
  show,
  update,
  destroy,
  findBySrcCollectionAndTraitValue,
  findCollectionRangeTokenId,
  findBySrcCollection,
  findTraitValuesBySrcCollectionAndTypeTrait,
  pupulateCollectionAsset,
  pupulateCollectionStats
} from './controller'
import { schema } from './model'

export Asset, { schema } from './model';

const router = new Router()
const { name, srcCollection, provider, apikey, asset } = schema.tree

/**
 * @api {post} /assets Create asset
 * @apiName CreateAsset
 * @apiGroup Asset
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Asset's name.
 * @apiParam srcCollection Asset's srcCollection.
 * @apiParam provider Asset's provider.
 * @apiParam apikey Asset's apikey.
 * @apiParam asset Asset's asset.
 * @apiSuccess {Object} asset Asset's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Asset not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, srcCollection, provider, apikey, asset }),
  create)

/**
 * @api {get} /assets Retrieve assets
 * @apiName RetrieveAssets
 * @apiGroup Asset
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of assets.
 * @apiSuccess {Object[]} rows List of assets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(
    {
      page: {
        max: Infinity
      }
    }
  ),
  index)

router.get('/collection/assets/',
  // token({ required: true }),
  pupulateCollectionAsset)
router.get('/collection/assets/stats',
  // token({ required: true }),
  pupulateCollectionStats)
/**
 * @api {get} /assets/trait_type Retrieve assets by id SrcCollection trait_type and value
 * @apiName RetrieveAssetsTraitType
 * @apiGroup Asset
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} srcCollection id SrcCollection.
 * @apiParam {String} trait_type name of the trait type to search.
 * @apiParam {String} value value of the trait type to search .
 * @apiSuccess {Object[]} rows List of assets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/trait_type',
  token({ required: true }),
  query(),
  findBySrcCollectionAndTraitValue)
/**
 * @api {get} /assets/token_range Retrieve assets by id SrcCollection from-to range
 * @apiName RetrieveAssetsTokenRange
 * @apiGroup Asset
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} srcCollection id SrcCollection.
 * @apiParam {Number} from name of the trait type to search.
 * @apiParam {Number} to value of the trait type to search .
 * @apiSuccess {Number} count Total amount of assets.
 * @apiSuccess {Object[]} rows List of assets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/token_range',
  token({ required: true }),
  query(),
  findCollectionRangeTokenId)

/**
 * @api {get} /assets/srcCollection Retrieve assets by srcCollection
 * @apiName RetrieveAssetsBySrcCollection
 * @apiGroup Asset
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiQuery srcCollectio
 * @apiParam {String} srcCollection id SrcCollection.
 * @apiSuccess {Number} count Total amount of assets.
 * @apiSuccess {Object[]} rows List of assets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/srcCollection',
  token({ required: true }),
  query(),
  findBySrcCollection)

/**
 * @api {get} /assets/srcCollection Retrieve assets by srcCollection
 * @apiName RetrieveAssetsBySrcCollection
 * @apiGroup Asset
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiQuery srcCollectio
 * @apiParam {String} srcCollection id SrcCollection.
 * @apiSuccess {Number} count Total amount of assets.
 * @apiSuccess {Object[]} rows List of assets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/trait_values_by_type',
  token({ required: true }),
  findTraitValuesBySrcCollectionAndTypeTrait)

/**
 * @api {get} /assets/:id Retrieve asset
 * @apiName RetrieveAsset
 * @apiGroup Asset
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} asset Asset's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Asset not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /assets/:id Update asset
 * @apiName UpdateAsset
 * @apiGroup Asset
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Asset's name.
 * @apiParam srcCollection Asset's srcCollection.
 * @apiParam provider Asset's provider.
 * @apiParam apikey Asset's apikey.
 * @apiParam asset Asset's asset.
 * @apiSuccess {Object} asset Asset's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Asset not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, srcCollection, provider, apikey, asset }),
  update)

/**
 * @api {delete} /assets/:id Delete asset
 * @apiName DeleteAsset
 * @apiGroup Asset
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Asset not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
