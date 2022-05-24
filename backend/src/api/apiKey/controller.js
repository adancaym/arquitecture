import { Asset } from '../asset'
import { Provider } from '../provider'
import { findApiKeyList, findApikeyUsesAssets } from './pipelines'

export const getApiKeyToCronJobs = (req, res, next) => Provider.aggregate(findApiKeyList)
  .then(result => {
    const [list] = result
    const { arrayKeyId } = list
    return arrayKeyId
  })
  .then(list => Asset.aggregate(findApikeyUsesAssets(list)).then(uses => {
    res.json(uses)
  }))
