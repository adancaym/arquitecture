
import { Router } from 'express'
import { token } from '../../services/passport'
import { catalogs } from './controller'
const router = new Router()

router.get('/',
  token({ required: true }),
  catalogs)

export default router
