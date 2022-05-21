import { SrcCollection } from '.'

let srcCollection

beforeEach(async () => {
  srcCollection = await SrcCollection.create({ name: 'test', provider: 'test', apikey: 'test', srcCollection: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = srcCollection.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(srcCollection.id)
    expect(view.name).toBe(srcCollection.name)
    expect(view.provider).toBe(srcCollection.provider)
    expect(view.apikey).toBe(srcCollection.apikey)
    expect(view.srcCollection).toBe(srcCollection.srcCollection)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = srcCollection.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(srcCollection.id)
    expect(view.name).toBe(srcCollection.name)
    expect(view.provider).toBe(srcCollection.provider)
    expect(view.apikey).toBe(srcCollection.apikey)
    expect(view.srcCollection).toBe(srcCollection.srcCollection)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
