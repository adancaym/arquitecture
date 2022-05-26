export const findApikeyUsesAssets = (list) => [
  {
    $match: { apikey: { $in: list } }
  },
  {
    $group: {
      _id: { apikey: '$apikey' },
      uses: { $sum: 1 }
    }
  },
  {
    $project: { uses: '$uses', _id: 0 }
  }
]

export const findApiKeyUsesCollections = [
  {
    $match: { apikey: { $ne: null } }
  },
  {
    $group: {
      _id: { apikey: '$apikey' },
      'count(*)': { $sum: 1 }
    }
  },
  {
    $project: { apikey: '$_id.apikey', uses: '$count(*)', _id: 0 }
  }
]

export const findApiKeyList = [
  { $group: { _id: null, arrayKeyId: { $push: '$keyId' } } },
  {
    $project: {
      arrayKeyId: {
        $reduce: {
          input: '$arrayKeyId',
          initialValue: [],
          in: { $setUnion: ['$$value', '$$this'] }
        }
      }
    }
  }
]
