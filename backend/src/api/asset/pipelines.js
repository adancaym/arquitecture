
export const pipelineFindCollectionRangeTokenId = (collection, from, to) => ({
  $expr: {
    $and: [
      { $eq: ['$srcCollection', { $toObjectId: collection }] },
      {
        $and: [
          { $gte: [{ $toLong: '$asset.token_id' }, { $toLong: from }] },
          { $lte: [{ $toLong: '$asset.token_id' }, { $toLong: to }] }]
      }
    ]
  }
})

export const pipelineFindTraitTypesBySrcCollection = (collection) => [
  { $match: { $expr: { $eq: ['$srcCollection', { $toObjectId: collection }] } } },
  {
    $group: {
      _id: null,
      trait_types: { $push: '$asset.traits.trait_type' }
    }
  },
  {
    $project: {
      trait_types: {
        $reduce: {
          input: '$trait_types',
          initialValue: [],
          in: { $setUnion: ['$$value', '$$this'] }
        }
      }
    }
  }
]

export const pipelineFindTraitValuesBySrcCollectionAndTypeTrait = (collection, typeTrait) => [
  {
    $match: {
      $and: [
        { $expr: { $eq: ['$srcCollection', { $toObjectId: collection }] } },
        { 'asset.traits.trait_type': { $eq: typeTrait } }
      ]

    }
  },
  {
    $group: {
      _id: null,
      trait_values: { $push: '$asset.traits.value' }
    }
  },
  {
    $project: {
      trait_values: {
        $reduce: {
          input: '$trait_values',
          initialValue: [],
          in: { $setUnion: ['$$value', '$$this'] }
        }
      }
    }
  }
]

export const pipelineFindBySrcCollectionAndTraitValue = (collection, traitType, value) => ({
  $and: [
    {
      $and: [
        { srcCollection: { $eq: collection } },
        { 'asset.traits.trait_type': { $eq: traitType } }
      ]
    },
    { 'asset.traits.value': { $eq: value } }
  ]
})
