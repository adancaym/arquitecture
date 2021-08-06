import {Router} from 'express'
import {middleware as query} from 'querymen'
import {middleware as body} from 'bodymen'
import {token} from '../../services/passport'
import {create, index, show, update, destroy, download, upload} from './controller'
import {schema} from './model'

export File, {schema} from './model'

const router = new Router()
const {file, ext, name, size, mime} = schema.tree

/**
 * @api {post} /files Create file
 * @apiName CreateFile
 * @apiGroup File
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam file File's file.
 * @apiParam ext File's ext.
 * @apiParam name File's name.
 * @apiParam size File's size.
 * @apiParam mime File's mime.
 * @apiSuccess {Object} file File's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 File not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({required: true}),
  body({file, ext, name, size, mime}),
  create)

/**
 * @api {get} /files Retrieve files
 * @apiName RetrieveFiles
 * @apiGroup File
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} files List of files.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({required: true}),
  query(),
  index)

/**
 * @api {get} /files/:id Retrieve file
 * @apiName RetrieveFile
 * @apiGroup File
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} file File's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 File not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({required: true}),
  show)

/**
 * @api {put} /files/:id Update file
 * @apiName UpdateFile
 * @apiGroup File
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam file File's file.
 * @apiParam ext File's ext.
 * @apiParam name File's name.
 * @apiParam size File's size.
 * @apiParam mime File's mime.
 * @apiSuccess {Object} file File's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 File not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({required: true}),
  body({file, ext, name, size, mime}),
  update)

/**
 * @api {delete} /files/:id Delete file
 * @apiName DeleteFile
 * @apiGroup File
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 File not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({required: true}),
  destroy)


router.get('/download/:id',
  token({required: false}),
  download
)

router.post('/upload',
  token({required: false}),
  upload
)

export default router
