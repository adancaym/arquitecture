import { Router } from 'express'
import { getApiKeyToCronJobs } from './controller'

const router = new Router()
router.get('/',
  getApiKeyToCronJobs
)
export default router
