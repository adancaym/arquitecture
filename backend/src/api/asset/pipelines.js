
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


export const pipelineFindTraitCollection = (collection) => [
  { $match: { $expr: { $eq: ['$srcCollection', { $toObjectId: collection }] } } },
  {
    $project: { traits: '$asset.traits', _id: 0 }
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
