
export const pipelineFindCollectionRangeTokenId = (collection, from, to) => ({
  $expr: {
    $and: [
      { $eq: ['$srcCollection', { $toObjectId: collection }] },
      {
        $and: [
          { $gte: [{ $toLong: '$tokenId' }, { $toLong: from }] },
          { $lte: [{ $toLong: '$tokenId' }, { $toLong: to }] }]
      }
    ]
  }
})


export const pipelineFindBySrcCollectionAndTraitValue = (collection, traitType, value) => ({
  $and: [
    {
      $and: [
        { srcCollection: { $eq: collection } },
        { 'detail.traits.trait_type': { $eq: traitType } }
      ]
    },
    { 'detail.traits.value': { $eq: value } }
  ]
})
