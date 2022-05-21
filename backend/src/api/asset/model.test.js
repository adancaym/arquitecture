import { Asset } from '.'

let asset

beforeEach(async () => {
  asset = await Asset.create({ name: 'test', srcCollection: 'test', provider: 'test', apikey: 'test', asset: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = asset.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(asset.id)
    expect(view.name).toBe(asset.name)
    expect(view.srcCollection).toBe(asset.srcCollection)
    expect(view.provider).toBe(asset.provider)
    expect(view.apikey).toBe(asset.apikey)
    expect(view.asset).toBe(asset.asset)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = asset.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(asset.id)
    expect(view.name).toBe(asset.name)
    expect(view.srcCollection).toBe(asset.srcCollection)
    expect(view.provider).toBe(asset.provider)
    expect(view.apikey).toBe(asset.apikey)
    expect(view.asset).toBe(asset.asset)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
